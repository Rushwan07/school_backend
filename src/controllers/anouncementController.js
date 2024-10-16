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

    if (classId !== "--" && classId.trim()) {
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
    const annVal = await newAnnouncement.populate("classId");

    res.status(201).json({
        status: "success",
        data: {
            announcement: annVal,
        },
    });
});

exports.editAnnouncement = catchAsync(async (req, res, next) => {
    const { announcementId } = req.params;

    if (!announcementId) {
        return next(new AppError("Announcement ID is required", 400));
    }

    const { title, description, classId } = req.body;

    if (!title || !description) {
        return next(
            new AppError("Title and description are required fields", 400)
        );
    }
    console.log("working fine");
    // Fetch the current announcement to check the original classId
    const existingAnnouncement = await Announcement.findById(announcementId);
    if (!existingAnnouncement) {
        return next(new AppError("Announcement not found", 404));
    }

    let classExists = null;
    if (classId !== "--" && classId) {
        classExists = await Class.findById(classId);
        if (!classExists) {
            return next(new AppError("Class not found", 404));
        }
    }

    // If the classId has changed, remove the announcementId from the previous class
    if (
        existingAnnouncement.classId &&
        existingAnnouncement.classId.toString() !== classId
    ) {
        await Class.findByIdAndUpdate(existingAnnouncement.classId, {
            $pull: { announcementId: existingAnnouncement._id },
        });
    }

    // Update the announcement with the new details
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
        announcementId,
        {
            title,
            description,
            classId: classExists ? classId : null,
        },
        { new: true }
    );

    // If a new class is set, add the announcementId to the new class
    if (classExists) {
        await Class.findByIdAndUpdate(classId, {
            $push: { announcementId: updatedAnnouncement._id },
        });
    }

    const annVal = await updatedAnnouncement.populate("classId");

    res.status(200).json({
        status: "success",
        data: {
            announcement: annVal,
        },
    });
});

exports.deleteAnnouncement = catchAsync(async (req, res, next) => {
    const { announcementId } = req.params;

    if (!announcementId) {
        return next(new AppError("Announcement ID is required", 400));
    }

    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
        return next(new AppError("Announcement not found", 404));
    }

    // If the announcement is associated with a class, remove it from the class
    if (announcement?.classId) {
        await Class.findByIdAndUpdate(announcement.classId, {
            $pull: { announcementId: announcement._id },
        });
    }

    // Now delete the announcement
    await Announcement.findByIdAndDelete(announcementId);

    return res.status(200).json({
        status: "success",
        message: "Deleted successfully",
    });
});

exports.getAnouncementsForAdmin = catchAsync(async (req, res, next) => {
    const announcement = await Announcement.find().populate("classId");
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
    }).populate("classId");

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
