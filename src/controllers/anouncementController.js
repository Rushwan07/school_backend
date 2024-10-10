const Announcement = require("../models/AnounceMentModel");
const Class = require("../models/ClassModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
// {
//     "title":"College day",
//     "description":"description about our college day",
//     "date":"2024-10-04",
//     "classId":"6704ec91fee39a5e6ebd0162"

// }

exports.createAnnouncement = catchAsync(async (req, res, next) => {
    const { title, description, classId } = req.body;

    if (!title || !description) {
        return next(
            new AppError("Title and description are required fields", 400)
        );
    }

    let classExists = null;

    if (classId?.trim()) {
        classExists = await Class.findById(classId);
        if (!classExists) {
            return next(new AppError("Class not found", 404));
        }
    }

    const newAnnouncement = await Announcement.create({
        title,
        description,
        classId: classExists ? classId : null,
    });

    if (classExists) {
        await Class.findByIdAndUpdate(classId, {
            $push: { announcementId: newAnnouncement._id },
        });
    }

    res.status(201).json({
        status: "success",
        data: {
            announcement: newAnnouncement,
        },
    });
});

exports.editAnnouncement = catchAsync(async (req, res, next) => {
    const { anouncementId } = req.params;

    if (!anouncementId) {
        return next(new AppError("Anouncement are required fields", 400));
    }

    const { title, description, classId } = req.body;

    if (classId?.trim()) {
        classExists = await Class.findById(classId);
        if (!classExists) {
            return next(new AppError("Class not found", 404));
        }
    }

    if (!title || !description) {
        return next(
            new AppError("Title and description are required fields", 400)
        );
    }

    const newAnnouncement = await Announcement.findByIdAndUpdate(
        anouncementId,
        {
            title,
            description,
            classId: classExists ? classId : null,
        },
        { new: true }
    );
    res.status(201).json({
        status: "success",
        data: {
            announcement: newAnnouncement,
        },
    });
});

exports.deleteAnouncement = catchAsync(async (req, res, next) => {
    const { anouncementId } = req.params;

    if (!anouncementId) {
        return next(new AppError("Anouncement are required fields", 400));
    }

    await Announcement.findByIdAndDelete(anouncementId);
    return res.status(200).json({
        status: "success",
        message: "Deleted successfully",
    });
});

exports.getAnouncementsForAdmin = catchAsync(async (req, res, next) => {
    const announcement = await Announcement.find();

    res.status(201).json({
        status: "success",
        data: {
            announcement,
        },
    });
});

exports.getAnouncementsForStaff = catchAsync(async (req, res, next) => {
    const teacherClassIds = req.user.classId;

    const announcements = await Announcement.find({
        $or: [{ classId: { $in: teacherClassIds } }, { classId: null }],
    });

    res.status(200).json({
        status: "success",
        data: {
            announcements,
        },
    });
});

exports.getAnouncementsForStudents = catchAsync(async (req, res, next) => {
    const studentClassId = req.user.classId;

    const announcements = await Announcement.find({
        $or: [{ classId: studentClassId }, { classId: null }],
    });

    res.status(200).json({
        status: "success",
        data: {
            announcements,
        },
    });
});
