const express = require('express')
const router = express.Router()
const passport = require('passport')
const followshipController = require('../../controllers/followshipController')

router.get('/following/:id', passport.authenticate('user-token'), followshipController.getFollowingOfUser)
router.get('/follower/:id', passport.authenticate('user-token'), followshipController.getFollowerOfUser)
router.delete('/following/:id', passport.authenticate('user-token'), followshipController.deleteFollowing)
router.post('/following/:id', passport.authenticate('user-token'), followshipController.createFollowing)

module.exports = router