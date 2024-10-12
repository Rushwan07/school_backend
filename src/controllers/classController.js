const Class = require("../models/ClassModel");
const Teacher = require("../models/TeacherModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
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
        subjectsId,
        studentsId,
        eventId,
        announcementId,
        baseFees,
    } = req.body;

    console.log(name,
        capacity,
        "teacherId", teacherId,
        "subjectsId", subjectsId,
        "studentsId", studentsId,
        eventId,
        announcementId,
        baseFees,)

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

    const newClass = await Class.create({
        name,
        capacity,
        teacherId,
        subjectsId,
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

    res.status(201).json({
        status: "success",
        data: {
            class: newClass,
        },
    });
});

exports.getClass = catchAsync(async (req, res, next) => {
    const classes = await Class.find().populate("subjectsId studentsId");
    res.status(200).json({
        status: "success",
        data: {
            class: classes,
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

    classToUpdate.name = name;
    classToUpdate.capacity = capacity;
    classToUpdate.teacherId = teacherId;
    classToUpdate.subjectsId = subjectsId;
    classToUpdate.studentsId = studentsId;
    classToUpdate.eventId = eventId;
    classToUpdate.announcementId = announcementId;
    classToUpdate.baseFees = baseFees;

    await classToUpdate.save();

    res.status(200).json({
        status: "success",
        data: {
            class: classToUpdate,
        },
    });
});
