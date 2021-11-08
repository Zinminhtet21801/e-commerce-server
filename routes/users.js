const express = require("express");
const router = express.Router();
const User = require("../config/mongoose.js");

router.get("/", (req, res) => {
  User.find({}, (err, result) => {
    res.json(result);
  });
});

router.get("/session", (req, res) => {
  console.log(req.user);
  res.send(req.user && req.user.name)
});

router.get("/:name", (req, res) => {
  const name = req.params.name;
  User.findOne({ name: name }, (err, result) => {
    res.json(result);
  });
});

router.get("/cookie/:cookie", (req, res) => {
  const cookie = req.params.cookie;
    User.findOne({ _id: cookie }, (err, result) => {
      res.send(result ? result.name : "");
    });
});



module.exports = router;
