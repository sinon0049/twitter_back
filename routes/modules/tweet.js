const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../../models')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply

router.get('/', passport.authenticate('jwt'), async (req, res) => {
    try {
        const resData = await Tweet.findAll({ 
            include: [
                { model: User, attributes: ['id', 'name', 'account']}, 
                'Replies', 
                'Likes'
            ]
        })
        res.json(resData)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', passport.authenticate('jwt'), async (req, res) => {
    try {
        const id = req.params.id
        const resData = await Tweet.findByPk(id, {
            include: [
                {
                    model: Reply,
                    include: {
                        model: User,
                        attributes: ['id', 'name', 'avatar', 'account']
                    }
                },
                'Likes', 
                { 
                    model: User, 
                    attributes: ['id', 'name', 'account', 'avatar']
                }
            ]
        })
        res.json(resData)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router