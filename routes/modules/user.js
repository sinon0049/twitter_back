const express = require('express')
const passport = require('passport')
const router = express.Router()
const db = require('../../models')
const User = db.User

router.get('/', async (req, res) => {
    const result = await User.findAll()
    res.json(result)
})

router.post('/login', express.json(), passport.authenticate('local'), (req, res) => {
    console.log(req.user)
    res.send('success')
})

module.exports = router