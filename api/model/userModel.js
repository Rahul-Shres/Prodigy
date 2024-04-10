const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userModel = new Schema({
    userEmail : {
        type : String,
        required : [true, "email must be provided"]
    },
    userName : {
        type : String,
        required : [true, "Username must be provided"]
    },
    userPhoneNumber:{
        type: Number,
        required : [true, "number must be provided"]
    },
    userPassword : {
        type : String,
        required : [true, "password must be provided"],
        minlength : 8,
        // select : false

    },
    role: {
        type: String,
        enum: ["Customer", "Admin"],
        defult : "Customer"
    },
    otp : {
        type : Number,
        select : false
    },
    isOtpVerified : {
        type : Boolean,
        default : false,
        select : false
    }
},{
    timestamps : true
})

const User = mongoose.model("User", userModel)
module.exports = User