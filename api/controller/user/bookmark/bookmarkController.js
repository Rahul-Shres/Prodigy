const Product = require("../../../model/productModel");
const User = require("../../../model/userModel");



exports.addToBookmark = async(req,res)=>{
    const userId = req.user.id;
    const productId = req.params.productId;
    console.log(userId, "userID")
    if(!productId || !userId){
        return res.status(400).json({
            message : "Please provide ProductId"
        })
    }

    const productExists = await Product.findById(productId);
    if(!productExists){
        return res.status(404).json({
            message : "No product with that productId"
        })
    }
    const userExists = await User.findById(userId);
    console.log(userExists, "userExists")
    userExists.bookmark.push(productId);
    await userExists.save();
    res.status(200).json({
        message: "Product added to Bookmark"
    })
}


exports.getMyBookmarks = async(req,res)=>{
    const userId = req.user.id;
    const userData = await User.findById(userId).populate({
        path : "bookmark",
        select : "-productStatus"
    })
    res.status(200).json({
        message : "Bookmark Item Fetched Successfully",
        data  : userData.bookmark
    })
}


exports.deleteProductFromBookmark = async(req,res)=>{
    const productId = req.params.productId;
    const userId = req.user.id
    console.log(productId, userId, "product id and user id")
    const product = await Product.findById(productId)
    if(!product){
        return res.status(404).json({
            message :  "No product with that productId"
        })
    }
    const user = await User.findById(userId)
    user.bookmark = user.bookmark.filter(pId => pId != productId)
    await user.save();
    res.status(200).json({
        message : "Item removed From Cart"
      })

}