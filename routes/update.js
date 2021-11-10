const router = require("express").Router();
const User = require("../config/mongoose");

router.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  const { name, address, phone, email, currentPwd, newPwd, comfirmPwd } =
    req.body;
  let user = await User.findOne({ _id: id });
  name && (user.name = name);
  phone && (user.phone = phone);
  address && (user.address = address);
  email && (user.gmail = email);
  user.save().then((user) => {
    res.status(200).send("success|Account updated");
  });
});

module.exports = router;
