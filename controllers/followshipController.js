const express = require('express')
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
            const followingList = await Followship.findAll({
                where: { followerId: req.params.id },
                order: [['createdAt', 'DESC']],
                raw: true,
                nest: true,
                include: [{
                    model: User,
                    attributes: ['id', 'name', 'account', 'avatar', 'cover', 'introduction'],
                    as: 'Following'
                }]
            })
            followingList.forEach(item => followingArr.push(item.followingId))
            const unfollowings = await User.findAll({
                attributes: ['id', 'name', 'account', 'avatar', 'cover', 'introduction'],
                where: {
                    id: { [notIn]: followingArr },
                    role: 'user'
                },
                raw: true
            })
            res.json({
                Followings: followingList,
                Unfollowings: unfollowings
            })
        } catch (error) {
            console.log(error)
        }
    },
    getFollowerOfUser: async (req, res) => {
        try {
            const followerList = await Followship.findAll({
                where: { followingId: req.params.id },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['id', 'name', 'account', 'avatar', 'cover', 'introduction'],
                        as: 'Follower'
                    }
                ]})
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
            const newData = await Followship.create({
                followerId,
                followingId
            })
            res.json({
                status: 'success',
                message: 'Followship created successfully.',
                newData
            })
        } catch (error) {
            console.log(error)
        }
    }
}