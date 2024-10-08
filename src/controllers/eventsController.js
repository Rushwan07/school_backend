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
        return next(new AppError("Date is required", 400));
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
        classId,
        dates,
        startTime,
        endTime,
    });

    res.status(201).json({
        status: "success",
        data: {
            event,
        },
    });
});
