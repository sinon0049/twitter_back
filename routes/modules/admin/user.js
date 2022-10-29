const express = require('express')
const passport = require('passport')
const router = express.Router()
const db = require('../../../models')
const User = db.User
const Tweet = db.Tweet
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/signin', passport.authenticate('admin-signin'), async (req, res) => {
    const data = req.user
    const userId  = req.user.id
    const token = jwt.sign({ userId }, 'secret')
    res.send({
        ...data,
        token
    })
})

module.exports = router