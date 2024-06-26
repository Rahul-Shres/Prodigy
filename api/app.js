
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
const authRoute = require('./routes/auth/userAuthRoute')
const productRoute = require('./routes/admin/product/productRoute')
const adminUserRoute = require('./routes/admin/user/adminUserRoute')
const userReviewRoute = require("./routes/user/userReview/userReviewRoute")
const bookmarkRoute = require("./routes/user/bookmarkRoute/bookmarkRoute")
const profileRoute = require("./routes/user/profileRoute/profileRoute")


// this is middleware
app.use("/api", authRoute)
app.use("/api", productRoute)
app.use("/api", adminUserRoute)
app.use("/api",userReviewRoute)
app.use("/api/profile", profileRoute)
app.use("/api/bookmark", bookmarkRoute)

PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}` );
})