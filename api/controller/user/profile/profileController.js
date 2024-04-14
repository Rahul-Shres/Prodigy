// get my profile controller

const User = require("../../../model/userModel");
const bcrypt = require("bcryptjs")

exports.getMyProfile = async (req, res) => {
  const userId = req.user.id;
  const myProfile = await User.find({ _id: userId });
  //send response
  res.status(200).json({
    data: myProfile,
    message: "Profile fetched successfully",
  });
};

//update my profile controller
exports.updateMyProfile = async (req, res) => {
  const userId = req.user.id;
  const { userName, userEmail, userPhoneNumber } = req.body;
  console.log(userName, userEmail, userPhoneNumber);
  //update my profile
  const updateData = await User.findByIdAndUpdate(
    userId,
    { userName, userEmail, userPhoneNumber },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    data : updateData,
    message : "Profile updated successfully"
  })
};



exports.updateMyPassword = async(req,res)=>{
    const userId = req.user.id
    const {oldPassword, newPassword, confirmPassword} = req.body;
    if(!oldPassword || !newPassword || !confirmPassword){
        return res.status(400).json({
            message : "Please provide oldPassword,newPassword,confirmPassword"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message : "newPassword and oldPassword didnt matched"
        })
    }
    //taking out the hash of the old password
    const userData = await User.findById(userId)
    const hashedOldPassword = userData.userPassword

    // check if oldPassword is correct or not
    const isOldPasswordCorrect = bcrypt.compareSync(oldPassword, hashedOldPassword)
    if(!isOldPasswordCorrect){
        return res.status(400).json({
            message : "OldPassword didn't matched"
        })
    }
    // matched vayo vaney 
    userData.userPassword = bcrypt.hashSync(newPassword, 12)
    await userData.save()
    res.status(200).json({
        message : "Password Changed successfully"
    })

}



//delete my profile
exports.deleteMyProfile = async(req,res)=>{
    const userId = req.user.id
    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message : "Profile deleted Successfully",
        data : null
    })
}