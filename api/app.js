
const express = require("express");

const app = express();
require("dotenv").config()
const { connectDatabase } = require("./database/db");
const User = require("./model/userModel");


connectDatabase();

app.use(express.json());
app.use(express.urlencoded({extended : true}))



// continue form 1:26:00
// Register User Api
app.post("/register", async(req,res)=>{
    const {email, username, phonenumber, password} = req.body;
    console.log(email, username, phonenumber, password);
    if(!email || !username || !password || !phonenumber){
        return res.status(400).json({
            message : "please send email, username, password, phonenumber"
        })
    }
    //
    await User.create({
        userEmail : email,
        userName : username,
        userPhoneNumber :phonenumber,
        userPassword : password
    })
})

PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}` );
})