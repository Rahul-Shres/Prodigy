const mongoose = require("mongoose")
const adminSeeder = require("../adminSeeder")
exports.connectDatabase = async() =>{
    await mongoose.connect(process.env.MONGOURI)
    console.log("db connected")
    adminSeeder()
} 
