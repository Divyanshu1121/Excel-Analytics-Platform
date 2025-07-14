const mongoose = require("mongoose");

const ExcelDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    filename: String,
    sheetName: String,
    data: [Object], // Array of rows from Excel
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ExcelData", ExcelDataSchema);
