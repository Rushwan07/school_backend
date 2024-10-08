const Attendance = require("../models/AttendanceModel");
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
    const { classId, date, students } = req.body;

    if (!classId || !date || !students || students.length === 0) {
        return next(
            new AppError("classId, date, and students array are required", 400)
        );
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
        return next(new AppError("Class not found", 404));
    }

    const studentAttendance = await Promise.all(
        students.map(async (student) => {
            const { _id: studentId, present } = student;

            // const studentExists = await Student.findById(studentId);
            // if (!studentExists) {
            //     return next(
            //         new AppError(`Student with id ${studentId} not found`, 404)
            //     );
            // }
            console.log(present);
            console.log(present === "true");
            return {
                studentId,
                attendance: present === "true",
            };
        })
    );

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
