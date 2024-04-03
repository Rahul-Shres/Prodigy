const User = require("../../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");


exports.registerUser = async(req,res)=>{
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
}




exports.loginUser = async(req,res)=>{
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
}

exports.forgotPassword = async(req,res)=>{
    const {email} = req.body;
    if(!email){
        return res.status(400).json({
            message : "Please Provide Email"
        })
    }

    const userEmailFound = await User.find({userEmail : email})
    if(userEmailFound.length == 0){
        return res.status(400).json({
            message: "User with Email Not Found"
        })
  
    }
     // send otp
     const otp = Math.floor(1000 + Math.random() * 9000);
     userEmailFound[0].otp = otp
     await userEmailFound[0].save();
     await sendEmail({
         email :email,
         subject : "Your Otp for Prodigy authentication forgotPassword",
         message : `Your otp is ${otp} . Dont share with anyone`
     })
     res.status(200).json({
         message : "OTP sent successfully",
         data : email
     })
}