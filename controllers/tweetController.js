const db = require('../models')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply

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
    getTweetsOfUser: async (req, res) => {
        try {
            const userId = req.params.id
            const resData = await Tweet.findAll({
                where: { userId },
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
    getTweet: async (req, res) => {
        try {
            const id = req.params.id
            const resData = await Tweet.findByPk(id, {
                order: [[Reply, 'createdAt', 'DESC']],
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
    },
    createTweet: async (req, res) => {
        try {
            const { id } = req.user
            const { description } = req.body
            const newTweet = await Tweet.create({
                UserId: id,
                description
            })
            res.json({
                status: 'success',
                message: "Tweet created successfully.",
                tweet: newTweet,
            })
        } catch (error) {
            console.log(error)
        }
    }
}