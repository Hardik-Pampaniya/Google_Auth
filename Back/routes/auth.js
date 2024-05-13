const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get('/login/success', (req, res) => {
    if (req) {
        res.status(200).json({
            error: false,
            message: "Successfully Login",
        })
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
})


router.get('/login/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in Failure",
    })
})



router.get("/logout", (req,res) => {
    req.logout();
    res.redirect(process.env.CLIENT_ID)
})

module.exports = router;
