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
    console.log("*******************************");
    console.log(classId);
    console.log(students);
    console.log("*******************************");

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
        console.log("Done6");
    }

    await attendanceCount.save();
    console.log("Done7");

    const newAttendance = await Attendance.create({
        classId,
        date,
        students: studentAttendance,
    });
    console.log("Done8");

    res.status(201).json({
        status: "success",
        data: {
            attendance: newAttendance,
        },
    });
});
