const mongoose = require("mongoose");

const extraCurricularAcctivitiesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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
