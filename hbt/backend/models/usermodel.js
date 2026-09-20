const mongoose=require("mongoose");

// user schema
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true
    }
});

// usermodel
const userdata=mongoose.model("usermodel",userschema);

module.exports = userdata