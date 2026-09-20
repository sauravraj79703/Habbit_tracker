const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_uri, {});
        console.log("mongodb connected");
    } catch (err) {
        console.error("mongodb connection error:", err);
    }
};

module.exports = {
    connectDB
};
