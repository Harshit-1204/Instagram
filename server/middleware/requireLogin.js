require("dotenv").config()
const { compare } = require("bcrypt")
const jwt= require("jsonwebtoken")
const mongoose = require("mongoose")
const User = mongoose.model("User")




module.exports = (req,res,next)=>{
     
    const {authorization} = req.headers

    if(!authorization){
        res.status(401).json({err:"You must be log in"})
    }

    const token = authorization.replace("Bearer ","")

    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(!err){
            const {_id} = payload
            User.findById({_id})
            .then((userdata)=>{
              req.user = userdata  
              next()
            })
            
        }else{
            res.status(401).json({err:"you must be log in"})
        }
    })


}