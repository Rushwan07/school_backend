const Attendance = require("../models/AttendanceModel");
const AttendanceCount = require("../models/AttendanceCountModel");
const Class = require("../models/ClassModel");
const Student = require("../models/StudentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// {
//     "classId":"6704ec91fee39a5e6ebd0162",
//     "date":"2024-10-03",

//         "students":[
//         {
//             "_id": "670504cf9d81be21a0a06e3e",
//             "regNo": "1",
//             "name": "student 1",
//             "present": "false"
//         },
//          {
//             "_id": "670504d59d81be21a0a06e45",
//             "regNo": "1",
//             "name": "student 1",
//             "present": "true"
//         }

//     ]
//     }

exports.createAttendance = catchAsync(async (req, res, next) => {
    const { classId, students } = req.body;

    const date = new Date();
    const today = date.toISOString().split("T")[0];
    const month = today.substring(0, 7);

    if (!classId || !students || students.length === 0) {
        return next(
            new AppError("classId and students array are required", 400)
        );
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
        return next(new AppError("Class not found", 404));
    }

    let presentCount = 0;
    let absentCount = 0;

    const studentAttendance = await Promise.all(
        students.map(async (student) => {
            const { _id: studentId, present } = student;
            console.log("studentId", studentId);
            const studentExists = await Student.findById(studentId);
            if (!studentExists) {
                return next(
                    new AppError(`Student with id ${studentId} not found`, 404)
                );
            }
            console.log("Done");

            if (present === "false") {
                studentExists.absentDays.push(date);
                absentCount++;
            } else {
                studentExists.presentDays.push(date);
                presentCount++;
            }
            console.log("studentExists.absentDays", studentExists);

            await studentExists.save();

            return {
                studentId,
                attendance: present === "true",
            };
        })
    );

    let attendanceCount = await AttendanceCount.findOne({ date: today });

    if (attendanceCount) {
        attendanceCount.presentCount += presentCount;
        attendanceCount.absentCount += absentCount;
        attendanceCount.totalStudents += students.length;
    } else {
        attendanceCount = new AttendanceCount({
            date: today,
            presentCount,
            absentCount,
            totalStudents: students.length,
            month,
        });
    }

    await attendanceCount.save();

    const newAttendance = await Attendance.create({
        classId,
        date,
        students: studentAttendance,
    });

    res.status(201).json({
        status: "success",
        data: {
            attendance: newAttendance,
        },
    });
});

exports.editAttendance = catchAsync(async (req, res, next) => {
    const { attendanceId } = req.params;
    const { classId, students } = req.body;

    const date = new Date();
    const today = date.toISOString().split("T")[0];
    const month = today.substring(0, 7);

    if (!classId || !students || students.length === 0) {
        return next(
            new AppError("classId and students array are required", 400)
        );
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
        return next(new AppError("Class not found", 404));
    }

    let presentCount = 0;
    let absentCount = 0;

    const studentAttendance = await Promise.all(
        students.map(async (student) => {
            const { _id: studentId, present } = student;
            console.log("studentId", studentId);
            const studentExists = await Student.findById(studentId);
            if (!studentExists) {
                return next(
                    new AppError(`Student with id ${studentId} not found`, 404)
                );
            }
            console.log("Done");

            if (present === "false") {
                studentExists.absentDays.push(date);
                absentCount++;
            } else {
                studentExists.presentDays.push(date);
                presentCount++;
            }
            console.log("studentExists.absentDays", studentExists);

            await studentExists.save();

            return {
                studentId,
                attendance: present === "true",
            };
        })
    );

    let attendanceCount = await AttendanceCount.findOne({ date: today });

    if (attendanceCount) {
        attendanceCount.presentCount += presentCount;
        attendanceCount.absentCount += absentCount;
        attendanceCount.totalStudents += students.length;
    } else {
        attendanceCount = new AttendanceCount({
            date: today,
            presentCount,
            absentCount,
            totalStudents: students.length,
            month,
        });
    }

    await attendanceCount.save();

    const newAttendance = await Attendance.findByIdAndUpdate(
        attendanceId,
        {
            classId,
            date,
            students: studentAttendance,
        },
        { new: true }
    );

    res.status(201).json({
        status: "success",
        data: {
            attendance: newAttendance,
        },
    });
});

exports.getAttendanceForStudent = catchAsync(async (req, res, next) => {
    const { _id } = req.user;

    console.log(_id);

    const attendance = await Student.findById(_id).select(
        "absentDays presentDays"
    );

    res.status(200).json({
        status: "success",
        data: {
            attendance: attendance,
        },
    });
});

exports.getAttendanceByClassId = catchAsync(async (req, res, next) => {
    const classId = req.params.classId;

    const currentDate = new Date().toDateString();

    const attendance = await Attendance.find({ classId: classId }).populate(
        "students.studentId"
    );

    const filteredAttendance = attendance.filter((record) => {
        return new Date(record.date).toDateString() === currentDate;
    });

    console.log(filteredAttendance);
    res.status(200).json({
        status: "success",
        data: {
            attendance: filteredAttendance,
        },
    });
});
