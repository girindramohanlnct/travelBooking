const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res, next) => {
  fullname = req.body.fullName;
  console.log(fullname);
  if (req.body.password === req.body.confirmPassword) {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        fullName: fullname,
        email: req.body.email,
        phone: req.body.phone,
        password: hash
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            messege: "User Created",
            result: result
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    });
  } else {
    res.status(501).json({
      messege: "password is not maitched",
      suggestation: "imput the same password"
    });
  }
});

router.post("/login", (req, res, next) => {
  console.log(req.body.email, "login");
  console.log(req.param.email, "waah login");
  let fatchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "auth failed"
        });
      }
      fatchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "auth failed"
        });
      }
      const token = jwt.sign(
        { email: fatchedUser.email, userId: fatchedUser._id },
        "secert_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        name: fatchedUser.fullName,
        expiresIn: 3600,
        userId: fatchedUser._id
      });
      console.log(fatchedUser.fullName);
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "auth failed"
      });
    });
});

module.exports = router;
