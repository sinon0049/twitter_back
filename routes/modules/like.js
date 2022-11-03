const express = require('express')
const passport = require('passport')
const router = express.Router()
const likeController = require('../../controllers/likeController')

router.post('/:tweetId', passport.authenticate('user-token'), likeController.createLike)
router.delete('/:tweetId', passport.authenticate('user-token'), likeController.deleteLike)
router.get('/user/:userId', passport.authenticate('user-token'), likeController.getLikeOfUser)

module.exports = router