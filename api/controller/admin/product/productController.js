const Product = require("../../../model/productModel");
const fs = require("fs")



exports.createProduct = async(req,res)=>{
    const file = req.file;
    let filePath
    if(!file){
        filePath ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1dQPM88-Vq0f-YM8xILMQdKktXgKBMN6XH9cCBleA&s"
    }else{
        filePath = req.file.filename
    }
    const {productName, productDescription , productStockQty , productPrice, productStatus} = req.body;
    console.log(productName, productDescription , productStockQty , productPrice, productStatus)
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



exports.getProducts = async(req,res)=>{
    const allProducts = await Product.find().populate({
        path : "productReview",
        populate :{
            path : "userId",
            select : "userName userEmail"
        }
    })

    if(allProducts.length === 0){
        return res.status(400).json({
            message : "No Products Found",
            products : []
        })
    }else{
        return res.status(200).json({
            message : "Product Fetched Successfully",
            data : allProducts
        })
    }

}

exports.getProduct = async(req,res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            message: "Please provide product id"
        })
    }
    const getSingleProduct = await Product.find({_id:id});
    if(getSingleProduct.length === 0){
        return res.status(400).json({
            message : "Product with that id not found"
        })
    }else{
        return res.status(200).json({
            message : "Single Product Fetched Successfully",
            data : getSingleProduct
        })
    }
}

exports.deleteProduct = async(req,res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            message : "Please provide id"
        })
    }

    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(400).json({
            message : "Product with that id not found"
        })
    }

    oldProductImageUrl = oldData.productImage
    const lengthToCut = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImageUrl.slice(lengthToCut)
     // REMOVE FILE FROM UPLOADS FOLDER
     fs.unlink("./uploads" + finalFilePathAfterCut,(err)=>{
        if(err){
            console.log("error deleting file", err)
        }else{
            console.log("file deleted successfully")
        }

        
     }
    
    )
    await Product.findByIdAndDelete(id)
    res.status(200).json({
        message: "ProductDeleted Successfully"
    })
}


exports.editProduct = async(req,res)=>{

    const {id} = req.params 
      const {productName,productDescription,productPrice,productStatus,productStockQty} = req.body
      if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty || !id){
        return res.status(400).json({
            message : "Please provide productName,productDescription,productPrice,productStatus,productStockQty,id"
        })
    }
    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }
 
    const oldProductImage = oldData.productImage // http://localhost:3000/1698943267271-bunImage.png"
    const lengthToCut  = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut) // 1698943267271-bunImage.png
    if(req.file && req.file.filename){
        // REMOVE FILE FROM UPLOADS FOLDER
            fs.unlink("./uploads/" +  finalFilePathAfterCut,(err)=>{
                if(err){
                    console.log("error deleting file",err) 
                }else{
                    console.log("file deleted successfully")
                }
            })
    }
   const datas =  await Product.findByIdAndUpdate(id,{
        productName ,
        productDescription ,
        productPrice,
        productStatus,
        productStockQty,
        productImage : req.file && req.file.filename ? process.env.BACKEND_URL +  req.file.filename :  oldProductImage
    },{
        new : true,
    
    })
    res.status(200).json({
        messagee : "Product updated successfully",
        datas
    })
}