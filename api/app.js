
const express = require("express");

const app = express();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
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

    const userFound = await User.find({userEmail : email})
    if(userFound.length > 0){
        return res.status(400).json({
            message : "User with that email exists"
        })
    }

    // else
    await User.create({
        userEmail : email,
        userName : username,
        userPhoneNumber :phonenumber,
        userPassword : bcrypt.hashSync(password,10)
    })

    res.status(201).json({
        message : "User Registered Successfully"
    })
})


app.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            message: "Please provide Email and Password"
        })
    }

    const userFound = await User.find({userEmail : email})
    if(userFound.length == 0){
        return res.status(404).json({
            message : "User with that email is not registered"
        })
    }

    //password check
    const isMatched = bcrypt.compareSync(password, userFound[0].userPassword);
    if(isMatched){
        //generate token
        const token = jwt.sign({id : userFound[0]._id}, "thisissecretkey",{
            expiresIn : '30d'
        })
        
        res.status(200).json({
                message : "User Loggeg in",
                token
        })
    }else{
        res.status(404).json({
            message : "Invalid Password"
        })
    }
})

PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}` );
})