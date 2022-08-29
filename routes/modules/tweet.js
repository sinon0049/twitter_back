const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../../models')
const Tweet = db.Tweet
const User = db.User

router.get('/all', passport.authenticate('jwt'), async (req, res) => {
    try {
        const resData = await Tweet.findAll({ 
            include: [
                { model: User, attributes: ['name', 'account']}, 
                'Replies', 
                'Likes'
            ]
        })
        res.json(resData)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router