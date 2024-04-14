const Product = require("../../../model/productModel");



exports.addToBookmark = async(req,res)=>{
    const userId = req.user.id;
    const productId = req.params.id;
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
    user.bookmark.push(productId);
    await user.save();
    res.status(200).json({
        message: "Product added to cart"
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
    const {productId} = req.params
    const userId = req.user.id
    const product = await Product.findById(productId)
    if(!product){
        return res.status(404).json({
            message :  "No product with that productId"
        })
    }
    const user = await User.findById(userId)
    user.cart = user.cart.filter(pId => pId != productId)
    await user.save();
    res.status(200).json({
        message : "Item removed From Cart"
      })

}