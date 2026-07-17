const mongoose = require("mongoose");

const connectDB = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI || "mongodb://127.0.0.1:27017/attendance_db"
        );

        console.log("MongoDB Connected");

    }

    catch (error) {

        console.warn("MongoDB unavailable, continuing in demo mode:", error.message);

    }

};

module.exports = connectDB;