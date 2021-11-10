const router = require("express").Router();
router.get("/", (req, res) => {
    req.session.destroy((err)=>{
        err && console.log(err)
        res.clearCookie("rememberMe", { domain: "localhost", path : "/" });
        res.clearCookie("connect.sid", { domain: "localhost", path : "/" });
        req.logOut();
        res.send("success|Logout Success");
    })
});

module.exports = router;
