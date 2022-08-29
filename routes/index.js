const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const tweet = require('./modules/tweet')

router.use('/user', user)
router.use('/tweet', tweet)

module.exports = router