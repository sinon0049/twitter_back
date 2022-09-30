const express = require('express')
const passport = require('passport')
const router = express.Router()
const db = require('../../models')
const User = db.User
const Reply = db.Reply
const Tweet = db.Tweet
const Like = db.Like
const jwt = require('jsonwebtoken')
const tweet = require('../../models/tweet')

router.get('/current_user', passport.authenticate('jwt'), async (req, res) => {
    const result = await User.findByPk(req.user.id)
    res.json(result)
})

router.post('/signin', passport.authenticate('local'), (req, res) => {
    const data = req.user
    const userId  = req.user.id
    const token = jwt.sign({ userId }, 'secret')
    res.send({
        ...data,
        token
    })
})

router.get('/:id', passport.authenticate('jwt'), async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id, {
            include: [
                { model: User, as: 'Followers', attributes: ['id', 'name', 'account', 'avatar']},
                { model: User, as: 'Followings', attributes: ['id', 'name', 'account', 'avatar']},
                { model: Tweet, as: 'Likes' }
            ],
            attributes: ['id', 'name', 'account', 'introduction', 'avatar', 'cover'],
        })
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router