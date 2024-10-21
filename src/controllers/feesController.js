const Fees = require("../models/FeesModel");
const Student = require("../models/StudentModel");
const Class = require("../models/ClassModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Create a fee record
exports.createFeeRecord = catchAsync(async (req, res, next) => {
    const {
        studentId,
        classId,
        fees,
        date,
    } = req.body;


    if (!studentId || !classId || !fees || !date) {
        return next(new AppError("All fields are required", 400));
    }

    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
        return next(new AppError(`Student with id ${studentId} does not exist`, 404));
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
        return next(new AppError(`Class with id ${classId} does not exist`, 404));
    }

    const baseFees = classExists.baseFees;

    const feesWithBase = [...fees, { name: "Base Fee", fee: baseFees }];

    // Calculate total fees
    const total = feesWithBase.reduce((acc, fee) => acc + Number(fee.fee), 0);

    const feeRecord = await Fees.create({
        studentId,
        classId,
        fees: feesWithBase,
        total,
        date,
    });

    res.status(201).json({
        status: "success",
        data: {
            feeRecord,
        },
    });
});

// Get all fees details
exports.getFeesDetails = catchAsync(async (req, res, next) => {
    const feesDetails = await Fees.find().populate("studentId classId");

    res.status(200).json({
        status: "success",
        data: {
            feesDetails,
        },
    });
});

// Get fees details for a specific student
exports.getFeesByStudentId = catchAsync(async (req, res, next) => {
    const studentId = req.user._id;

    const feesDetails = await Fees.find({ studentId }).populate("classId studentId");

    if (!feesDetails.length) {
        return next(new AppError("No fees records found for this student", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            feesDetails,
        },
    });
});

// Update payment status of fees
exports.updateFeesPaymentStatus = catchAsync(async (req, res, next) => {
    const { feeId } = req.params; // Assuming feeId is passed in the URL

    const feesDetails = await Fees.findByIdAndUpdate(
        feeId,
        { isPaid: true },
        { new: true }
    );

    if (!feesDetails) {
        return next(new AppError("No fees record found with this ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            feesDetails,
        },
    });
});

// Get fees details for a specific class
exports.getFeesByClass = catchAsync(async (req, res, next) => {
    const { classId } = req.params;

    const feesDetails = await Fees.find({ classId }).populate("studentId");

    if (!feesDetails.length) {
        return next(new AppError("No fees records found for this class", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            feesDetails,
        },
    });
});

exports.getById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const feesDetails = await Fees.findById(id).populate("studentId classId");

    if (!feesDetails) {
        return res.status(404).json({
            status: "fail",
            message: "No fees details found with that ID."
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            feesDetails,
        },
    });
});

