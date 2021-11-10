const router = require('express').Router();
const User = require('../config/mongoose');

router.patch('/user/:id', async (req, res) => {
    const id = req.params.id;
    const { name, address, phone, email, currentPwd, newPwd, comfirmPwd } = req.body;
    console.log(name)
    // let user = await User.findOne({_id: id});
    // user.name = name;
    // user.phone = phone;
    // user.gmail = email;
    // user.address = address;
    // user.save();
    // res.status(200).send('User updated');
})

module.exports = router;