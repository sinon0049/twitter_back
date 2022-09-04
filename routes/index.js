const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const tweet = require('./modules/tweet')
const followship = require('./modules/followship')

router.use('/user', user)
router.use('/tweet', tweet)
router.use('/followship', followship)

module.exports = router