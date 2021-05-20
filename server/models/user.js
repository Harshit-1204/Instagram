const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types;



const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    followers:[
        {type:ObjectId,ref:"User"}
    ],
    following:[
        {type:ObjectId,ref:"User"}
    ],
    pic:{
        type:String,
        default:"https://res.cloudinary.com/harshit-cloud/image/upload/v1621490661/User-512_jimgyi.png"
    }

    
})

mongoose.model("User",userSchema)