const express = require('express')
const db = require('../models')
const User = db.User
const Tweet = db.Tweet
const Like = db.Like

module.exports = {
    createLike: async (req, res) => {
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
    },
    deleteLike: async (req, res) => {
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
    },
    getLikeOfUser: async (req, res) => {
        try {
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
        } catch (error) {
            console.log(error)
        }
    }
}