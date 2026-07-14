const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    studentNo:{
        type:String,
        required:true
    },

    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    course:{
        type:String,
        required:true
    },

    year:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        default:"Present"
    }

});

module.exports = mongoose.model("Student",studentSchema);