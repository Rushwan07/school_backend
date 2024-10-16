const Event = require("../models/EventModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};

// {
//     "eventName": "asdf",
//     "description": "asdf",
//     "classId": "6704ec91fee39a5e6ebd0162",
//     "date": {
//         "startDate": "2024-10-28",
//         "dueDate": "2024-11-02"
//     },
//     "startTime": "16:41",
//     "endTime": "16:43"
// }
exports.createEvent = catchAsync(async (req, res, next) => {
    const { eventName, description, classId, date, startTime, endTime } =
        req.body;

    let { startDate, dueDate } = date;

    if (!eventName || !description) {
        return next(new AppError("name, description  are required", 400));
    }

    if (!startDate) {
        return next(new AppError("Select a valid date..", 400));
    }

    let dates;
    if (startDate === dueDate) {
        dates = [new Date(startDate)];
    } else {
        dates = getDatesInRange(startDate, dueDate);
    }

    const event = await Event.create({
        name: eventName,
        description,
        classId: classId != "--" ? classId : null,
        dates,
        startTime,
        endTime,
    });
    await event.populate("classId");
    res.status(201).json({
        status: "success",
        data: {
            event,
        },
    });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
    const { eventId } = req.params;
    console.log(eventId);
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({
        status: "success",
        message: "Event deleted",
    });
});

exports.editEvent = catchAsync(async (req, res, next) => {
    console.log("done");
    const { eventName, description, classId, date, startTime, endTime } =
        req.body;
    console.log(
        "done1",
        eventName,
        description,
        classId,
        date,
        startTime,
        endTime
    );

    const { eventId } = req.params;
    console.log("done3");

    let { startDate, dueDate } = date;
    console.log("done4");

    console.log(eventName, description, classId, date, startTime, endTime);
    console.log("done5");

    if (!eventName || !description) {
        return next(new AppError("name, description  are required", 400));
    }
    console.log("done6");

    if (!startDate) {
        return next(new AppError("Select a valid date...", 400));
    }

    console.log("done7");

    let dates;
    if (startDate === dueDate) {
        dates = [new Date(startDate)];
    } else {
        dates = getDatesInRange(startDate, dueDate);
    }
    console.log("done8");

    const event = await Event.findByIdAndUpdate(
        eventId,
        {
            name: eventName,
            description,
            classId: classId != "--" ? classId : null,
            dates,
            startTime,
            endTime,
        },
        { new: true }
    );
    console.log("done9");

    res.status(201).json({
        status: "success",
        data: {
            event,
        },
    });
});
exports.getEventForTeacher = catchAsync(async (req, res, next) => {
    const classIds = req.user.classId;

    const events = await Event.find({
        $or: [{ classId: { $in: classIds } }, { classId: null }],
    }).populate("classId");

    res.status(200).json({
        status: "success",
        data: {
            events,
        },
    });
});

exports.getEventForAdmin = catchAsync(async (req, res, next) => {
    const events = await Event.find().populate("classId");
    res.status(200).json({
        status: "success",
        data: {
            events,
        },
    });
});
exports.getEventForStudent = catchAsync(async (req, res, next) => {
    const classIds = req.user.classId;

    const events = await Event.find({
        $or: [{ classId: { $in: classIds } }, { classId: null }],
    }).populate("classId");

    res.status(200).json({
        status: "success",
        data: {
            events,
        },
    });
});
