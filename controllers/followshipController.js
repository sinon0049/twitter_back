const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../models')
const User = db.User
const Followship = db.Followship
const Sequelize = require('sequelize')
const { notIn } = Sequelize.Op

module.exports = {
    getFollowingOfUser: async (req, res) => {
        try {
            const currentUser = req.params.id
            const followingArr = [Number(currentUser)]
            const followingList = await User.findByPk(currentUser, {
                attributes: ['id', 'name', 'account', 'avatar', 'cover'],
                include: [
                    {
                        attributes: ['id', 'name', 'account', 'avatar', 'cover', 'introduction'],
                        model: User, as: 'Followings'
                    }
                ],
            })
            followingList.dataValues.Followings.forEach(item => followingArr.push(item.dataValues.id))
            const unfollowings = await User.findAll({
                attributes: ['id', 'name', 'account', 'avatar', 'cover', 'introduction'],
                where: {
                    id: {
                        [notIn]: followingArr
                    },
                    role: 'user'
                },
                raw: true
            })
            followingList.dataValues.unfollowings = unfollowings
            res.json(followingList)
        } catch (error) {
            console.log(error)
        }
    },
    getFollowerOfUser: async (req, res) => {
        try {
            const followerList = await User.findByPk(req.params.id, {
                attributes: ['id', 'name', 'account', 'avatar', 'cover', 'introduction'],
                include: [
                    {
                        model: User,
                        attributes: ['id', 'name', 'account', 'avatar', 'cover', 'introduction'],
                        as: 'Followers'
                    }
                ]
            })
            res.json(followerList)
        } catch (error) {
            console.log(error)
        }
    },
    deleteFollowing:async (req, res) => {
        try {
            const followingId = req.params.id
            const followerId = req.user.id
            const followship = await Followship.findOne({
                where: {
                    followingId,
                    followerId
                }
            })
            await followship.destroy()
            res.json({
                status: 'success',
                message: 'Followship deleted successfully.'
            })
        } catch (error) {
            console.log(error)
        }
    },
    createFollowing: async (req, res) => {
        try {
            const followingId = req.params.id
            const followerId = req.user.id
            await Followship.create({
                followerId,
                followingId
            })
            res.json({
                status: 'success',
                message: 'Followship created successfully.'
            })
        } catch (error) {
            console.log(error)
        }
    }
}