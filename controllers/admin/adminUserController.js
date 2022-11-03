const express = require('express')
const passport = require('passport')
const router = express.Router()
const db = require('../../models')
const User = db.User
const Tweet = db.Tweet
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    signIn: async (req, res) => {
        const data = req.user
        const userId  = req.user.id
        const token = jwt.sign({ userId }, 'secret')
        res.send({
            ...data,
            token
        })
    },
    getAllUsers: async (req, res) => {
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
    }
}