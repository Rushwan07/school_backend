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

    // Check if a date is provided in the request query
    const queryDate = req.query.date
        ? new Date(req.query.date).toDateString()
        : new Date().toDateString();

    try {
        // Fetch the attendance for the class
        const attendance = await Attendance.find({ classId: classId }).populate(
            "students.studentId"
        );

        // Filter attendance records by the provided date or today's date
        const filteredAttendance = attendance.filter((record) => {
            return new Date(record.date).toDateString() === queryDate;
        });

        // If no attendance records are found for the given date, return an error
        if (filteredAttendance.length === 0) {
            return res.status(404).json({
                status: "error",
                message: `No attendance records found for the date: ${queryDate}`,
            });
        }

        // If attendance is found, return it
        res.status(200).json({
            status: "success",
            data: {
                attendance: filteredAttendance,
            },
        });
    } catch (error) {
        // Handle any errors that occur
        return res.status(500).json({
            status: "error",
            message: "An error occurred while fetching the attendance",
            error: error.message,
        });
    }
});
exports.getAttendanceChartData = catchAsync(async (req, res, next) => {
    const year = "2024";

    const allMonths = Array.from({ length: 12 }, (_, i) => {
        const month = (i + 1).toString().padStart(2, "0");
        return `${year}-${month}`;
    });

    const chartData = await AttendanceCount.aggregate([
        {
            $project: {
                month: { $dateToString: { format: "%Y-%m", date: "$date" } },
                presentCount: 1,
                totalStudents: 1,
            },
        },
        {
            $group: {
                _id: "$month",
                averageAttendance: {
                    $avg: {
                        $multiply: [
                            { $divide: ["$presentCount", "$totalStudents"] },
                            100,
                        ],
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                month: "$_id",
                attendance: { $round: ["$averageAttendance", 0] },
            },
        },
        {
            $sort: { month: 1 },
        },
    ]);

    const fullChartData = allMonths.map((month) => {
        const monthData = chartData.find((data) => data.month === month);
        return {
            month,
            attendance: monthData ? monthData.attendance : 0,
        };
    });

    res.status(200).json({
        status: "success",
        data: { chartData: fullChartData },
    });
});
