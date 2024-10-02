const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InvoiceSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: "User", // Reference to student
            required: true,
        },
        items: [
            {
                description: String, //class fees,transportations costs, other activityes
                amount: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        dueDate: {
            type: Date, //end date
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
