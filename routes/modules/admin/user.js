const express = require('express')
const passport = require('passport')
const router = express.Router()
const adminUserController = require('../../../controllers/admin/adminUserController')

router.post('/signin', passport.authenticate('admin-signin'), adminUserController.signIn)
router.get('/user', passport.authenticate('admin-token'), adminUserController.getAllUsers)

module.exports = router