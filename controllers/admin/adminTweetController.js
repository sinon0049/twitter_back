const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../../models')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply
const Like = db.Like

module.exports = {
    getAllTweets: async (req, res) => {
        try {
            const resData = await Tweet.findAll({ 
                include: [
                    { model: User, attributes: ['id', 'name', 'account', 'avatar']}, 
                    'Replies', 
                    'Likes'
                ],
                order: [['createdAt', 'DESC']]
            })
            res.json(resData)
        } catch (error) {
            console.log(error)
        }
    },
    deleteTweet: async (req, res) => {
        try {
            const tweetId = req.params.id
            const tweet = await Tweet.findByPk(tweetId)
            if(!tweet) {
                return res.json({
                    status: "error",
                    message: "Tweet doesn't exist."
                })
            }
            await tweet.destroy()
            await Reply.destroy({ where: { tweetId }})
            await Like.destroy({ where: { tweetId }})
            return res.json({
                status: "success",
                message: "Tweet deleted successfully."
            })
        } catch (error) {
            console.log(error)
        }
    }
}