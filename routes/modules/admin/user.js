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

router.get('/user', passport.authenticate('admin-token'), async (req, res) => {
    try {
        const user = await User.findAll({
            attributes: ['id', 'email', 'account', 'avatar', 'cover', 'name'],
            include: [
                {
                    model: Tweet,
                    include: ['Likes']
                },
                {
                    model: User,
                    as: 'Followers'
                },
                {
                    model: User,
                    as: 'Followings'
                }
            ],
        })
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router