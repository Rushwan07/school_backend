const mongoose = require("mongoose");
const Parent = require("../models/parentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new parent
exports.createParent = catchAsync(async (req, res, next) => {
    const { email, phone, address, students } = req.body;

    const parent = await Parent.create({ email, phone, address, students });

    return res.status(201).json({
        status: "success",
        data: { parent },
    });
});

// Get all parents
exports.getAllParents = catchAsync(async (req, res, next) => {
    const parents = await Parent.find().populate("students");

    return res.status(200).json({
        status: "success",
        data: { parents },
    });
});

// Get a parent by ID
exports.getParentById = catchAsync(async (req, res, next) => {
    const parentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(parentId)) {
        return next(new AppError("Invalid parent ID.", 400));
    }

    const parent = await Parent.findById(parentId).populate("students");

    if (!parent) {
        return next(new AppError("Parent not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { parent },
    });
});

// Update a parent
exports.updateParent = catchAsync(async (req, res, next) => {
    const parentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(parentId)) {
        return next(new AppError("Invalid parent ID.", 400));
    }

    const parent = await Parent.findByIdAndUpdate(parentId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!parent) {
        return next(new AppError("Parent not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { parent },
    });
});

// Delete a parent
exports.deleteParent = catchAsync(async (req, res, next) => {
    const parentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(parentId)) {
        return next(new AppError("Invalid parent ID.", 400));
    }

    const parent = await Parent.findByIdAndDelete(parentId);

    if (!parent) {
        return next(new AppError("Parent not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
