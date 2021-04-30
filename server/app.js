require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")



const app = express()

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
mongoose.connection.on("connected",()=>console.log("succesfully connected to DB"))
mongoose.connection.on("error",()=>{console.log("err in connection")})

app.use(express.json())


require("./models/user")
require("./models/post")



app.use(require("./router/userRoute"))





app.listen(3000,()=>{
    console.log("server started succesfully")
})