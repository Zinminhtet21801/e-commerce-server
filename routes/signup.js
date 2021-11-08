const express = require('express');
const router = express.Router();
const User = require('../config/mongoose');
const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {
    console.log(req.body.inputs)
    const {
      name,
      gmail,
      password,
      comfirmPassword,
      phone,
      city,
      postal,
      address,
    } = req.body.inputs;
    const newUser = new User({
      name: name,
      gmail: gmail,
      password: password,
      phone: phone,
      city: city,
      postal: postal,
      address: address,
    });

    // check validation
    if(password !== comfirmPassword && phone.length != 11) {
        res.send("Error| Something Went Wrong.");
    } else {
        // validated, check user already exists
        User.findOne({gmail: gmail})
            .then(user => {
                // user exists
                if(user) {
                    // res.redirect('http://localhost:3000/signup');
                    res.send("error|user already exists!!!");
                } else {
                    // user doesn't exist and creating new one
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    res.send("success|Signup completed!!");
                                })
                                .catch(err => console.log(`error in signup -> ${err}`))
                        })
                    })
                }
            })
    }
})

module.exports = router; 