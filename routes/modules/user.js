const express = require('express')
const passport = require('passport')
const router = express.Router()
const db = require('../../models')
const User = db.User
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
    const result = await User.findAll()
    res.json(result)
})

router.post('/signin', express.json(), passport.authenticate('local'), (req, res) => {
    const data = req.user
    const userId  = req.user.id
    const token = jwt.sign({ userId }, 'secret')
    res.send({
        ...data,
        token
    })
})

router.post('/test', passport.authenticate('jwt'), (req, res) => {
    res.send({
        ...req.user,
        status: 'success'
    })
})

module.exports = router