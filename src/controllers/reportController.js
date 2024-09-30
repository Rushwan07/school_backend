const Report = require('../models/reportModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create a new report
exports.createReport = catchAsync(async (req, res) => {
    const { reportType, data } = req.body;
    const newReport = new Report({
        reportType,
        data
    });
    await newReport.save();
    res.status(201).json({
        status: 'success',
        data: {
            report: newReport,
        },
    });
});

// Get all reports
exports.getAllReports = catchAsync(async (req, res) => {
    const reports = await Report.find();
    res.status(200).json({
        status: 'success',
        results: reports.length,
        data: {
            reports,
        },
    });
});

// Get a single report by ID
exports.getReportById = catchAsync(async (req, res, next) => {
    const report = await Report.findById(req.params.id);
    if (!report) {
        return next(new AppError('Report not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            report,
        },
    });
});

// Update a report
exports.updateReport = catchAsync(async (req, res, next) => {
    const { reportType, data } = req.body;
    const updatedReport = await Report.findByIdAndUpdate(
        req.params.id,
        { reportType, data },
        { new: true, runValidators: true }
    );

    if (!updatedReport) {
        return next(new AppError('Report not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            report: updatedReport,
        },
    });
});

// Delete a report
exports.deleteReport = catchAsync(async (req, res, next) => {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
        return next(new AppError('Report not found', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
