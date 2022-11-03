const express = require('express')
const passport = require('passport')
const router = express.Router()
const replyController = require('../../controllers/replyController')

router.post('/', passport.authenticate('user-token'), replyController.createReply)
router.get('/user/:id', passport.authenticate('user-token'), replyController.getReplyOfUser)

module.exports = router