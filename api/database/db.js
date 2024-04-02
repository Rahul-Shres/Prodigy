const mongoose = require("mongoose")

exports.connectDatabase = async() =>{
    const MONGO = process.env.MONGOURI;
    await mongoose.connect(MONGO)
    console.log("db connected")
} 
