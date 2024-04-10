const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId : {
        // id of user is stored      
        type : Schema.Types.ObjectId,
        // relation to user is made
        ref : "User",
        required : [true, "A review must belong to user"]
    },
    productId : {
        // id of product is stored
        type : Schema.Types.ObjectId,
        // relation to product is made
        ref : "Product",
        required : [true, "A review must be of product"]
    },
    rating :{
        type : Number,
        default : 3,
    },
    message : {
        type : "String",
        required : true
    }
})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review