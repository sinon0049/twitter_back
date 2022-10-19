const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const tweet = require('./modules/tweet')
const followship = require('./modules/followship')
const reply = require('./modules/reply')
const like = require('./modules/like')

router.use('/user', user)
router.use('/tweet', tweet)
router.use('/followship', followship)
router.use('/reply', reply)
router.use('/like', like)

module.exports = router