const router = require('express').Router()
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(req.body.password,salt)
        const newUser =  new User({
            username: req.body.username,
            email: req.body.email,
            password: hasedPassword,
          });
         await newUser.save()
        res.status(200).json(" Đăng kí thành công !!!")
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email:req.body.email })
        if(!user) {
            res.status(500).json("Wrong username!")
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) {
            res.status(500).json("Wrong password!")
        }
        const { password, ...other } = user._doc
        if(user && validPassword) {
         res.status(200).json(other)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router