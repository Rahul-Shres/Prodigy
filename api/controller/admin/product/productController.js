const Product = require("../../../model/productModel");



exports.createProduct = async(req,res)=>{
    const file = req.file;
    let filePath
    if(!file){
        filePath ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1dQPM88-Vq0f-YM8xILMQdKktXgKBMN6XH9cCBleA&s"
    }else{
        filePath = req.file.filename
    }
    const {productName, productDescription , productStockQty , productPrice, productStatus} = req.body;
    if(!productName || !productDescription || !productStockQty || !productPrice || !productStatus){
        return res.status(400).json({
            message: "Please provide productName, productDescription , productStockQty , productPrice, productStatus"
        })
    }

    const newProduct = await Product.create({
        productName, 
        productDescription, 
        productStockQty, 
        productPrice, 
        productStatus,
        productImage : "http://localhost:3000/" +  filePath
    })

    res.status(200).json({
        message : "product created successfully",
        data : newProduct
    })
}