const User = require("./model/userModel")
const bcrypt = require("bcryptjs");

const adminSeeder = async(req,res) =>{

    const alreadySeeded = await User.findOne({userEmail: "admin@gmail.com"})
    if(!alreadySeeded){
        await User.create({
            userEmail : "admin@gmail.com",
            userPassword : bcrypt.hashSync("admin",10),
            userName : "admin",
            userPhoneNumber : 9810359789,
            role : "admin"
        })

        console.log("admin  seeded successfully")
    } else {
        console.log("admin already seeded")
    }

    
}

module.export = adminSeeder