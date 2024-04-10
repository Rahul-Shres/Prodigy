
const express = require("express");

const app = express();
require("dotenv").config();
const { connectDatabase } = require("./database/db");
const { registerUser, loginUser } = require("./controller/auth/authController");


connectDatabase();

app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use(express.static("./uploads"))

// Routes Here
const authRoute = require('./routes/user/userAuthRoute')
const productRoute = require('./routes/admin/product/productRoute')
const adminUserRoute = require('./routes/admin/user/adminUserRoute')
const userReviewRoute = require("./routes/user/userReviewRoute")


// this is middleware
app.use("/api", authRoute)
app.use("/api", productRoute)
app.use("/api", adminUserRoute)
app.use("/api",userReviewRoute)

PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}` );
})