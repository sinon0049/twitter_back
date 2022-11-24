const db = require('../models')
const Reply = db.Reply
const User = db.User
const Tweet = db.Tweet

module.exports = {
    createReply: async (req, res) => {
        try {
            const { id } = req.user
            const newReply = await Reply.create({
                UserId: id,
                ...req.body
            })
            res.json({
                status: 'success',
                message: 'Reply created successfully.',
                reply: newReply
            })
        } catch (error) {
            console.log(error)
        }
    },
    getReplyOfUser: async (req, res) => {
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
    }
}