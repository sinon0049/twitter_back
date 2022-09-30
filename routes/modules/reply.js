const express = require('express')
const passport = require('passport')
const router = express.Router()
const db = require('../../models')
const Reply = db.Reply
const User = db.User
const Tweet = db.Tweet

router.post('/', passport.authenticate('jwt'), async (req, res) => {
    const { id } = req.user
    await Reply.create({
        UserId: id,
        ...req.body
    })
    res.json({
        status: 'success'
    })
})

router.get('/user/:id', passport.authenticate('jwt'), async (req, res) => {
    try {
        const userId = req.params.id
        const resData = await Reply.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
            include: [
                { model: User, attributes: ['id', 'name', 'account', 'avatar']},
                { model: Tweet, include: [{ model: User, attributes: ['id', 'name', 'account', 'avatar']}]}
            ]
        })
        res.json(resData)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router