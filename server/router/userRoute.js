const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");
const loginRequired = require("../middleware/requireLogin");
const Post = require("../models/post");
const { populate } = require("../models/post");

router.get("/", loginRequired, (req, res) => {
  res.send("welcome");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please Add All Fields" });
  }

  User.findOne({ email: email }, (err, foundUser) => {
    if (foundUser) {
      return res.json({ message: "User already exist  with this email" });
    } else {
      bcrypt.hash(password, 12).then((hashPassword) => {
        const user = new User({
          name,
          email,
          password: hashPassword,
        });

        user
          .save()
          .then((result) => {
            console.log(result);
            return res.json({ message: "Succesfully Signed up" });
            
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please enter email and password both" });
  }

  User.findOne({ email: email }, (err, foundUser) => {
    if (!foundUser) {
      res.json({ error: "No user found With this email" });
    } else {
      bcrypt.compare(password, foundUser.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(
              { _id: foundUser._id },
              process.env.JWT_SECRET
            );
            
            const {name , email, _id} = foundUser;
             res.json({ token ,user:{name , email ,_id} });
          }
        })
        .catch((error) => {
          res.json({ error });
        });
    }
  });
});

router.post("/createpost", loginRequired, (req, res) => {
  const { title, body ,pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ Error: "Please Add All Fields" });
  }

  req.user.password = undefined
  const post = new Post({
    title,
    body,
    postedBy: req.user,
    photo: pic
  });

  post.save()
  .then(result=>{res.json({result})})
  .catch(err=>console.log(err))

});

router.get("/allpost",loginRequired,(req,res)=>{
  Post.find({})
  .populate("postedBy" ,"name email _id")
  .then((result)=>{
    return res.json(result)
  })
  .catch(err=>{
    return console.log(err)
  })
});

router.get("/mypost",loginRequired,(req,res)=>{
  Post.find({postedBy:req.user._id})
  .populate("postedBy","name _id")
  .then((result)=>res.json(result))
  .catch(err=>console.log(err))
})

module.exports = router;
