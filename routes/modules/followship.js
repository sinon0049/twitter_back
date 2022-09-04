const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../../models')
const Followship = db.Followship
const User = db.User

router.get('/', passport.authenticate('jwt'), async (req, res) => {
    const userId = req.user.id
    let followingArr = []
    await User.findByPk(userId, {
        include: [{
           model: User,
           attributes: ['id', 'name', 'account', 'avatar'],
           as: 'Followers' 
        }],
    })
    .then(userData => {
        userData.Followers.forEach(item => {
            followingArr.push(item.id)
        })
    })

    await User.findAll({
        attributes: ['id', 'name', 'account', 'avatar'],
        raw: true,
        where: {
            role: 'user'
        }
    })
    .then(userData => {
        return userData.map(user => {
            return {
                ...user,
                isFollower: followingArr.includes(user.id) ? true : false
            }
        })
    })
    .then(result => { return res.json(result) })
    //return res.send(followingArr)
})

module.exports = router