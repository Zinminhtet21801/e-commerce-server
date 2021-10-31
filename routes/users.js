const express = require('express');
const router = express.Router();
const User = require('../config/mongoose.js')

router.get('/', (req, res) => {
    User.find({}, (err, result) => {
      res.json(result);
    });
})

router.get('/:name', (req, res) => {
    const name = req.params.name;
    User.findOne({ name: name }, (err, result) => {
      res.json(result);
  });
})

module.exports = router;