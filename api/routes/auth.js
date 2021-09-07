const User = require('../models/User')
const bcrypt = require('bcrypt');

const router = require('express').Router()

router.post('/register', async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(400).json('Wrong credentials')

        const valid = await bcrypt.compare(req.body.password, user.password)
        !valid && res.status(400).json('Wrong credentials')

        const { password, ...others } = user._doc
        res.status(200).json(others)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router