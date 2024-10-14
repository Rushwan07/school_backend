const Class = require("../models/ClassModel");
const SubjectModel = require("../models/SubjectModel");
const Teacher = require("../models/TeacherModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Attendance = require("../models/AttendanceModel");
// {
//     "name":"X A",
//     "capacity":"10",
//     "teacherId":"6704dec78614c254200856f5",
//     "subjectsId":[],
//     "studentsId":[],
//     "baseFees":"5000"
//     }
exports.createClass = catchAsync(async (req, res, next) => {
    const {
        name,
        capacity,
        teacherId,
        studentsId,
        eventId,
        announcementId,
        baseFees,
        subjects, // Array of subjects
    } = req.body;

    if (!name || !name.trim()) {
        return next(new AppError("Class name is required", 400));
    }
    if (!capacity || capacity <= 0) {
        return next(
            new AppError("Class capacity must be a positive number", 400)
        );
    }
    if (!baseFees || baseFees < 0) {
        return next(
            new AppError("Base fees must be a non-negative number", 400)
        );
    }

    const existingClass = await Class.findOne({ name });
    if (existingClass) {
        return next(new AppError("Class name already exists", 400));
    }

    let subjectIds = [];
    for (const subject of subjects) {
        const { subjectName, teacher, lessons, description } = subject;
        console.log(subject);

        if (!subjectName || !subjectName.trim()) {
            return next(new AppError("Subject name is required", 400));
        }
        if (!description) {
            return next(new AppError("Subject description is required", 400));
        }
        if (!teacher) {
            return next(new AppError("Subject Staff is required", 400));
        }
        if (!lessons || lessons.length === 0) {
            return next(new AppError("At least one lesson is required", 400));
        }

        const newSubject = await SubjectModel.create({
            name: subjectName,
            description,
            teacherId: teacher,
            exams: [],
            lessions: lessons,
            assignments: [],
        });

        subjectIds.push(newSubject._id);
    }

    const newClass = await Class.create({
        name,
        capacity,
        teacherId,
        subjectsId: subjectIds,
        studentsId,
        eventId,
        announcementId,
        baseFees,
    });

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
        return next(new AppError("Teacher not found", 404));
    }

    teacher.classes.push(newClass._id);
    await teacher.save();

    await SubjectModel.updateMany(
        { _id: { $in: subjectIds } },
        { $set: { classId: newClass._id } }
    );
    const populatedClass = await Class.findById(newClass._id).populate(
        "teacherId"
    );

    res.status(201).json({
        status: "success",
        data: {
            class: populatedClass,
        },
    });
});

exports.getClass = catchAsync(async (req, res, next) => {
    const classes = await Class.find().populate(
        "subjectsId studentsId teacherId"
    );
    res.status(200).json({
        status: "success",
        data: {
            class: classes,
        },
    });
});

exports.getClassForAttendance = catchAsync(async (req, res, next) => {
    console.log("working fine");
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const classes = await Class.find().populate(
        "subjectsId studentsId teacherId"
    );

    const classWithAttendance = await Promise.all(
        classes.map(async (singleClass) => {
            const attendance = await Attendance.findOne({
                date: { $gte: startOfDay, $lte: endOfDay },
                classId: singleClass._id,
            });

            if (attendance) {
                return {
                    ...singleClass.toObject(),
                    attendanceId: attendance._id,
                };
            } else {
                return {
                    ...singleClass.toObject(),
                };
            }
        })
    );

    res.status(200).json({
        status: "success",
        data: {
            classes: classWithAttendance,
        },
    });
});

exports.getStaffClasses = catchAsync(async (req, res, next) => {
    const teacherId = req.user._id;
    if (!teacherId) {
        return next(
            new AppError("Only signined in staffs can acces this", 400)
        );
    }

    const classes = await Class.find({ teacherId }).populate("studentsId");
    res.status(200).json({
        status: "success",
        data: {
            class: classes,
        },
    });
});

exports.editClass = catchAsync(async (req, res, next) => {
    const {
        name,
        capacity,
        teacherId,
        subjectsId,
        studentsId,
        eventId,
        announcementId,
        baseFees,
    } = req.body;
    console.log("189");
    console.log(subjectsId);
    const classToUpdate = await Class.findById(req.params.classId);
    if (!classToUpdate) {
        return next(new AppError("Class not found", 404));
    }

    if (!name || !name.trim()) {
        return next(new AppError("Class name is required", 400));
    }
    if (!capacity || capacity <= 0) {
        return next(
            new AppError("Class capacity must be a positive number", 400)
        );
    }
    if (!baseFees || baseFees < 0) {
        return next(
            new AppError("Base fees must be a non-negative number", 400)
        );
    }

    if (classToUpdate.name !== name) {
        const existingClass = await Class.findOne({ name });
        if (existingClass) {
            return next(new AppError("Class name already exists", 400));
        }
    }

    if (classToUpdate.teacherId.toString() !== teacherId) {
        const oldTeacher = await Teacher.findById(classToUpdate.teacherId);
        if (oldTeacher) {
            oldTeacher.classes.pull(classToUpdate._id);
            await oldTeacher.save();
        }

        const newTeacher = await Teacher.findById(teacherId);
        if (!newTeacher) {
            return next(new AppError("New teacher not found", 404));
        }
        newTeacher.classes.push(classToUpdate._id);
        await newTeacher.save();
    }

    // classToUpdate.subjectsId = subjectsId;
    let subIds = [];

    subIds = await Promise.all(
        subjectsId.map(async (subject) => {
            if (subject?._id) {
                await SubjectModel.findByIdAndUpdate(subject._id, subject);
                return subject._id; // Return the ID after updating
            } else {
                let tempSub = await SubjectModel.create(subject);
                return tempSub._id; // Return the new ID after creation
            }
        })
    );

    classToUpdate.name = name;
    classToUpdate.capacity = capacity;
    classToUpdate.teacherId = teacherId;
    classToUpdate.subjectsId = subIds;
    classToUpdate.studentsId = studentsId;
    classToUpdate.eventId = eventId;
    classToUpdate.announcementId = announcementId;
    classToUpdate.baseFees = baseFees;

    await classToUpdate.save();
    const populatedClass = await Class.findById(classToUpdate._id).populate(
        "teacherId subjectsId"
    );

    res.status(200).json({
        status: "success",
        data: {
            class: populatedClass,
        },
    });
});

exports.getClassWithStudent = catchAsync(async (req, res, next) => {
    const { classId } = req.params;

    const classData = await Class.findById(classId)
        .populate({
            path: "studentsId",
            select: "regno name _id",
        })
        .populate({
            path: "subjectsId",
            select: "name _id",
        });
    const students = classData?.studentsId?.length ? classData.studentsId : [];
    const subjects = classData?.subjectsId?.length ? classData.subjectsId : [];

    return res.status(200).json({
        status: "success",
        data: {
            students,
            subjects,
        },
    });
});
