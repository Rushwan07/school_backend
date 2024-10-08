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
    const { title, description, date, classId } = req.body;

    if (!title || !description || !date) {
        return next(
            new AppError(
                "Title, description, and date are required fields",
                400
            )
        );
    }

    let classExists = null;
    if (classId) {
        classExists = await Class.findById(classId);
        if (!classExists) {
            return next(new AppError("Class not found", 404));
        }
    }

    const newAnnouncement = await Announcement.create({
        title,
        description,
        date,
        classId: classExists ? classId : null,
    });

    res.status(201).json({
        status: "success",
        data: {
            announcement: newAnnouncement,
        },
    });
});
