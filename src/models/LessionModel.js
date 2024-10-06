const mongoose = require("mongoose");

const lessionsSchema = new mongoose.Schema({});

module.exports = mongoose.model("Lession", lessionsSchema);
