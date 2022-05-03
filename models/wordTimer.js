const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    timestamp: Number,
    userID: String
})

module.exports = mongoose.model("wordTimer", schema)