const mongoose = require("mongoose")

const habitCardSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    days: [{
        type: String
    }],
    duration: {
        type: Number
    },
    enableReminder: {
        type: Boolean
    },
    reminderTime: {
        type: String
    },
    priority: {
        type: String
    },
    goal: {
        type: String
    },
    notes: {
        type: String,
    }

});

const habitCard = mongoose.model("habitCard",habitCardSchema);

module.exports = habitCard;
