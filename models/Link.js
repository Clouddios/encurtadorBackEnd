const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    originalUrl: {type: String, required: true},
    shortUrl: {type: String, required: true, unique: true},
    clicks: {type: Number, default: 0},
});

module.exports = mongoose.model("Link", linkSchema);