const Invoice = require('../models/invoiceModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create a new invoice
exports.createInvoice = catchAsync(async (req, res, next) => {
    const { studentId, items, totalAmount, dueDate } = req.body;

    const newInvoice = await Invoice.create({ studentId, items, totalAmount, dueDate });

    res.status(201).json({
        status: 'success',
        data: {
            invoice: newInvoice,
        },
    });
});

// Get all invoices
exports.getAllInvoices = catchAsync(async (req, res, next) => {
    const invoices = await Invoice.find().populate('studentId');

    res.status(200).json({
        status: 'success',
        data: {
            invoices,
        },
    });
});

// Get an invoice by ID
exports.getInvoiceById = catchAsync(async (req, res, next) => {
    const invoiceId = req.params.id;

    const invoice = await Invoice.findById(invoiceId).populate('studentId');
    if (!invoice) {
        return next(new AppError('Invoice not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            invoice,
        },
    });
});

// Update an invoice
exports.updateInvoice = catchAsync(async (req, res, next) => {
    const invoiceId = req.params.id;

    const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedInvoice) {
        return next(new AppError('Invoice not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            invoice: updatedInvoice,
        },
    });
});

// Delete an invoice
exports.deleteInvoice = catchAsync(async (req, res, next) => {
    const invoiceId = req.params.id;

    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);
    if (!deletedInvoice) {
        return next(new AppError('Invoice not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});
