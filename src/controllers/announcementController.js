const mongoose = require("mongoose");
const Announcement = require("../models/announcementModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new announcement
exports.createAnnouncement = catchAsync(async (req, res, next) => {
    const { title, description, date, classId } = req.body;

    const announcement = await Announcement.create({ title, description, date, classId });

    return res.status(201).json({
        status: "success",
        data: { announcement },
    });
});

// Get all announcements
exports.getAllAnnouncements = catchAsync(async (req, res, next) => {
    const announcements = await Announcement.find().populate("classId");
    
    return res.status(200).json({
        status: "success",
        data: { announcements },
    });
});

// Get an announcement by ID
exports.getAnnouncementById = catchAsync(async (req, res, next) => {
    const announcementId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(announcementId)) {
        return next(new AppError("Invalid announcement ID.", 400));
    }

    const announcement = await Announcement.findById(announcementId).populate("classId");
    
    if (!announcement) {
        return next(new AppError("Announcement not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { announcement },
    });
});

// Update an announcement
exports.updateAnnouncement = catchAsync(async (req, res, next) => {
    const announcementId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(announcementId)) {
        return next(new AppError("Invalid announcement ID.", 400));
    }

    const announcement = await Announcement.findByIdAndUpdate(announcementId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!announcement) {
        return next(new AppError("Announcement not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { announcement },
    });
});

// Delete an announcement
exports.deleteAnnouncement = catchAsync(async (req, res, next) => {
    const announcementId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(announcementId)) {
        return next(new AppError("Invalid announcement ID.", 400));
    }

    const announcement = await Announcement.findByIdAndDelete(announcementId);
    
    if (!announcement) {
        return next(new AppError("Announcement not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
