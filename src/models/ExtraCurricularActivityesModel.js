const mongoose = require("mongoose");

const extraCurricularAcctivitiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duedate: {
        type: Date,
    },

    fees: {
        type: String,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    },
});

module.exports = mongoose.model(
    "ExtraCurricularAcctivities",
    extraCurricularAcctivitiesSchema
);
