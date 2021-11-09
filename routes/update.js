const router = require('express').Router();
const User = require('../config/mongoose');

router.patch('/user/:name', async (req, res) => {
    const username = req.params.name;
    const { name, address, phone, currentPwd, newPwd, comfirmPwd } = req.body;

    let user = await User.findOne({name: name});
    user.address = address;
    user.save();
    res.status(200).send('User updated');
})

module.exports = router;