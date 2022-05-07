const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    timestamp: Number,
    userID: String,
    responseNumber: Number
})

module.exports = mongoose.model("ukraineWordTimer", schema)