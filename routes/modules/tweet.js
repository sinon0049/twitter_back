const express = require('express')
const router = express.Router()
const passport = require('passport')
const tweetController = require('../../controllers/tweetController')

router.get('/', passport.authenticate('user-token'), tweetController.getAllTweets)
router.get('/user/:id', passport.authenticate('user-token'), tweetController.getTweetsOfUser)
router.get('/:id', passport.authenticate('user-token'), tweetController.getTweet)
router.post('/', passport.authenticate('user-token'), tweetController.createTweet)

module.exports = router