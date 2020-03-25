const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res, next) => {
  let x = path.join(__dirname);
  let len1 = x.length - "routes".length;
  let s = x.slice(0, len1 - 1);
  res.sendFile(path.join(s, "views", "booking.html"));
});

router.get("/registration", (req, res, next) => {
  let x = path.join(__dirname);
  let len1 = x.length - "routes".length;
  let s = x.slice(0, len1 - 1);
  res.sendFile(path.join(s, "views", "registraion.html"));
});

router.get("/signin", (req, res, next) => {
  let x = path.join(__dirname);
  let len1 = x.length - "routes".length;
  let s = x.slice(0, len1 - 1);
  res.sendFile(path.join(s, "views", "login.html"));
});
router.get("/success", (req, res) => {
  let x = path.join(__dirname);
  let len1 = x.length - "routes".length;
  let s = x.slice(0, len1 - 1);
  res.sendFile(path.join(s, "views", "paySuccess.html"));
});

router.get("/cancle", (req, res) => {
  let x = path.join(__dirname);
  let len1 = x.length - "routes".length;
  let s = x.slice(0, len1 - 1);
  res.sendFile(path.join(s, "views", "payCancle.html"));
});
module.exports = router;
