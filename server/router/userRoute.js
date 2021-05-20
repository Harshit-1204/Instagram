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



router.post("/signup", (req, res) => {
  const { name, email, password ,pic} = req.body;
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
          pic
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
      bcrypt
        .compare(password, foundUser.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(
              { _id: foundUser._id },
              process.env.JWT_SECRET
            );

            const { name, email, _id,followers,following ,pic} = foundUser;
            res.json({ token, user: { name, email, _id,followers,following,pic } });
          }
        })
        .catch((error) => {
          res.json({ error });
        });
    }
  });
});

router.post("/createpost", loginRequired, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ Error: "Please Add All Fields" });
  }

  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    postedBy: req.user,
    photo: pic,
  });

  post
    .save()
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => console.log(err));
});

router.get("/allpost", loginRequired, (req, res) => {
  Post.find({})
    .populate("postedBy", "name email _id")
    .populate("comments.postedBy", "name _id")
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return console.log(err);
    });
});
router.get("/followingspost", loginRequired, (req, res) => {
  Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy", "name email _id")
    .populate("comments.postedBy", "name _id")
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return console.log(err);
    });
});

router.get("/mypost", loginRequired, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "name _id")
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.put("/like", loginRequired, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { like: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "name _id")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});
router.put("/unlike", loginRequired, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { like: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "name _id")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", loginRequired, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };

  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: {
        comments: comment,
      },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "name _id")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/delete/:postId", loginRequired, (req, res) => {
  Post.findById(req.params.postId, (err, post) => {
    if (post.postedBy._id.toString() === req.user._id.toString()) {
      post.remove();
      res.json({ message: "Succesfuly removed post", post });
    } else if (err) {
      res.status(422).json({ message: "Post not Found", error: err });
    }
  });
});

router.get("/user/:id", loginRequired, (req, res) => {
  User.findById(req.params.id)
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "name _id email")
        .exec((err, post) => {
          if (err) {
            return res.status(422).json({ error: err });
          } else {
            res.json({ user, post });
          }
        });
    })
    .catch((err) => {
      return res.status(404).json({ message: "User not found" });
    });
});

router.put('/follow',loginRequired,(req,res)=>{
  User.findByIdAndUpdate(req.body.followId,{
      $push:{followers:req.user._id}
  },{
      new:true
  },(err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }
    User.findByIdAndUpdate(req.user._id,{
        $push:{following:req.body.followId}
        
    },{new:true}).select("-password").then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })

  }
  )
})

router.put("/unfollow", loginRequired, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});


module.exports = router;
