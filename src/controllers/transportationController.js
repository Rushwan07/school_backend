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
    console.log({
        busNumber,
        stops,
        driverName,
        students,
    });
    const newTransport = await Transport.create({
        busNumber,
        stops,
        driverName,
        students: [],
    });

    res.status(201).json({
        status: "success",
        data: {
            transport: newTransport,
        },
    });
});
exports.editTransport = catchAsync(async (req, res, next) => {
    const { transportId } = req.params; // Get the transportId from the request params
    const { busNumber, stops, driverName, students } = req.body;

    // Find the transport by ID
    const transport = await Transport.findById(transportId);

    if (!transport) {
        return next(new AppError("Transport not found", 404));
    }

    // Validate bus number
    if (busNumber) {
        transport.busNumber = busNumber;
    }

    // Validate driver name
    if (driverName && driverName.trim()) {
        transport.driverName = driverName;
    }

    // Validate stops
    if (stops && stops.length > 0) {
        for (const stop of stops) {
            if (!stop.stopNumber) {
                return next(
                    new AppError("Each stop must have a stop number", 400)
                );
            }
            if (!stop.place || !stop.place.trim()) {
                return next(
                    new AppError("Each stop must have a place name", 400)
                );
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
        transport.stops = stops;
    }

    // Update students if provided
    if (students) {
        transport.students = students;
    }

    // Save the updated transport record
    await transport.save();

    res.status(200).json({
        status: "success",
        data: {
            transport,
        },
    });
});

exports.getTransport = catchAsync(async (req, res, next) => {
    const transport = await Transport.find();
    res.status(200).json({
        status: "success",
        data: { transport },
    });
});
