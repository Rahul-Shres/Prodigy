const mongoose = require("mongoose")

exports.connectDatabase = async() =>{
    await mongoose.connect(process.env.MONGOURI)
    console.log("db connected")
} 
