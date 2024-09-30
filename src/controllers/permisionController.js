const Permission = require('../models/permisionModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create a new permission
exports.createPermission = catchAsync(async (req, res) => {
    const { childId, permissionType, grantedBy, dateGranted } = req.body;
    const newPermission = new Permission({
        childId,
        permissionType,
        grantedBy,
        dateGranted
    });
    await newPermission.save();
    res.status(201).json({
        status: 'success',
        data: {
            permission: newPermission,
        },
    });
});

// Get all permissions
exports.getAllPermissions = catchAsync(async (req, res) => {
    const permissions = await Permission.find().populate('childId').populate('grantedBy');
    res.status(200).json({
        status: 'success',
        results: permissions.length,
        data: {
            permissions,
        },
    });
});

// Get a single permission by ID
exports.getPermissionById = catchAsync(async (req, res, next) => {
    const permission = await Permission.findById(req.params.id).populate('childId').populate('grantedBy');
    if (!permission) {
        return next(new AppError('Permission not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            permission,
        },
    });
});

// Update a permission
exports.updatePermission = catchAsync(async (req, res, next) => {
    const { childId, permissionType, grantedBy, dateGranted } = req.body;
    const updatedPermission = await Permission.findByIdAndUpdate(
        req.params.id,
        { childId, permissionType, grantedBy, dateGranted },
        { new: true, runValidators: true }
    ).populate('childId').populate('grantedBy');

    if (!updatedPermission) {
        return next(new AppError('Permission not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            permission: updatedPermission,
        },
    });
});

// Delete a permission
exports.deletePermission = catchAsync(async (req, res, next) => {
    const deletedPermission = await Permission.findByIdAndDelete(req.params.id);
    if (!deletedPermission) {
        return next(new AppError('Permission not found', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
