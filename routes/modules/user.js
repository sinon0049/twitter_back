const express = require('express')
const passport = require('passport')
const router = express.Router()
const multer = require('multer')
const userController = require('../../controllers/userController')

//multer settings
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/tmp/')
    },
    filename: function(req, file, cb) {
        if(file.mimetype === 'image/jpeg') cb(null, file.originalname + '.jpg') 
    }
})
const upload = multer({ storage })

//routes
router.get('/current_user', passport.authenticate('get-current-user'), userController.getCurrentUser)
router.post('/signin', passport.authenticate('user-signin'), userController.signIn)
router.post('/signup', userController.signUp)
router.put('/setting', passport.authenticate('user-token'), userController.updateSetting)
router.put('/info', passport.authenticate('user-token'), upload.fields([{name: 'cover'}, {name: 'avatar'}]), userController.updateInfo)
router.get('/:id', passport.authenticate('user-token'), userController.getInfo)

module.exports = router