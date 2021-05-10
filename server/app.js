require("dotenv").config()
const cors = require('cors')
const express = require("express")
const mongoose = require("mongoose")


const app = express()

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify: false })
mongoose.connection.on("connected",()=>console.log("succesfully connected to DB"))
mongoose.connection.on("error",()=>{console.log("err in connection")})

app.use(express.json())
app.use(cors())

require("./models/user")
require("./models/post")


app.use(require("./router/userRoute"))

app.listen(5000,()=>{
    console.log("server started succesfully")
})