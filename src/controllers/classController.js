const Class = require("../models/ClassModel");
const SubjectModel = require("../models/SubjectModel");
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
        { _id: { $in: subjectIds } }, // Find all subjects by their IDs
        { $set: { classId: newClass._id } } // Set classId to the new class's _id
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
