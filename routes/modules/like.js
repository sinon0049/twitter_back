const express = require('express')
const passport = require('passport')
const router = express.Router()
const db = require('../../models')
const User = db.User
const Tweet = db.Tweet
const Like = db.Like

router.post('/:tweetId', passport.authenticate('user-token'), async (req, res) => {
    try {
        const TweetId = req.params.tweetId
        const userId = req.user.id
        const newLike = await Like.create({
            TweetId,
            userId
        })
        res.json({
            status: 'success',
            message: 'Successfully added to like list.',
            like: newLike
        })
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:tweetId', passport.authenticate('user-token'), async (req, res) => {
    try {
        const TweetId = req.params.tweetId
        const userId = req.user.id
        const like = await Like.findOne({
            where: {
                TweetId, userId
            }
        })
        await like.destroy()
        res.json({
            status: 'success',
            message: 'Successfully deleted from like list.',
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/user/:userId', passport.authenticate('user-token'), async (req, res) => {
    const userId = req.params.userId
    const likeList = await User.findByPk(userId, {
        attributes: ['id', 'name', 'avatar', 'account'],
        include: [{
            model: Tweet,
            as: 'Likes',
            include: ['Replies', 'Likes', {
                model: User,
                attributes: ['id', 'name', 'avatar', 'account']
            }]
        }]
    })
    res.json(likeList)
})

module.exports = router