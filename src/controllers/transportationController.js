const Transport = require("../models/TransportationModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
// {
//     "busNumber":"01",
//     "stops":[
//         {
//             "stopNumber":"1",
//             "place":"first place",
//             "time":"11:30 AM",
//             "transportationFees":"60"
//         }
//     ],
//     "driverName":"test driver"

// }
exports.createTransport = catchAsync(async (req, res, next) => {
    const { busNumber, stops, driverName, students } = req.body;

    if (!busNumber) {
        return next(new AppError("Bus number is required", 400));
    }
    if (!driverName || !driverName.trim()) {
        return next(new AppError("Driver name is required", 400));
    }
    if (!stops || stops.length === 0) {
        return next(new AppError("At least one stop is required", 400));
    }

    for (const stop of stops) {
        if (!stop.stopNumber) {
            return next(new AppError("Each stop must have a stop number", 400));
        }
        if (!stop.place || !stop.place.trim()) {
            return next(new AppError("Each stop must have a place name", 400));
        }
        if (!stop.time) {
            return next(new AppError("Each stop must have a time", 400));
        }
        if (!stop.transportationFees || !stop.transportationFees.trim()) {
            return next(
                new AppError("Each stop must have transportation fees", 400)
            );
        }
    }

    const newTransport = await Transport.create({
        busNumber,
        stops,
        driverName,
        students,
    });

    res.status(201).json({
        status: "success",
        data: {
            transport: newTransport,
        },
    });
});
