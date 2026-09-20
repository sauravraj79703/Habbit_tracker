const mongoose = require("mongoose");

const dateschema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    cardId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    completed:[{
        type:String,
    }],
    day:[{
        type:String
    }]
});

const streak = mongoose.model("dates",dateschema);
module.exports = streak;