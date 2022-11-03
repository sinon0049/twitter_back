const express = require('express')
const router = express.Router()
const passport = require('passport')
const adminTweetController = require('../../../controllers/admin/adminTweetController')

router.get('/', passport.authenticate('admin-token'), adminTweetController.getAllTweets)
router.delete('/:id', passport.authenticate('admin-token'), adminTweetController.deleteTweet)

module.exports = router