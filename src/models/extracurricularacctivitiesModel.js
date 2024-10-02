const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExtraCurricularAcctivitiesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: String,

        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        fees: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "ExtraCurricularAcctivities",
    ExtraCurricularAcctivitiesSchema
);
