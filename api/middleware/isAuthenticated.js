
const jwt = require("jsonwebtoken")
const {promisify} = require("util");
const User = require("../model/userModel");

const isAuthenticated = async (req,res,next) =>{
    const token = req.headers.authorization;
    console.log(token, "token from isAuthenticated")
    
    if(!token){
        res.status(403).json({
            message : "Please login"
        })
    }

    try{
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
        console.log(decoded)
        const doesUserExist  = await User.findOne({_id : decoded.id})
        if(!doesUserExist ){
            return res.status(403).json({
                message : "User with that token does not exists"
            })
           
        }
        req.user  = doesUserExist
        next()
    } catch (error) {
        res.status(400).json({
            message : "something went wrong"
        })
    }
   
}

module.exports = isAuthenticated