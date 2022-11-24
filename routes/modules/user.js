const express = require('express')
const passport = require('passport')
const router = express.Router()
const multer = require('multer')
const userController = require('../../controllers/userController')
const db = require('../../models')
const Tweet = db.Tweet
const Reply = db.Reply
const Followship = db.Followship
const User = db.User

//multer settings
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //  use "tmp/" route for local environment
        cb(null, '/tmp/')
    },
    filename: function(req, file, cb) {
        if(file.mimetype === 'image/jpeg') cb(null, file.originalname + '.jpg') 
    }
})
const upload = multer({ storage })

//routes
router.get('/create_seed', async (req, res) => {
    try {
        await User.create({
            id: 1,
            email: 'user1@example.com',
            password: pwd,
            account: 'user1',
            name: 'user1',
            avatar: 'https://avatars.githubusercontent.com/u/8667311?s=200&v=4',
            introduction: 'Hi, I\'m user1!',
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await User.create({
            id: 2,
            email: 'user2@example.com',
            password: pwd,
            account: 'user2',
            name: 'user2',
            avatar: 'https://avatars.githubusercontent.com/u/8667311?s=200&v=4',
            introduction: 'Hi, I\'m user2!',
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await User.create({
            id: 3,
            email: 'user3@example.com',
            password: pwd,
            account: 'user3',
            name: 'user3',
            avatar: 'https://avatars.githubusercontent.com/u/8667311?s=200&v=4',
            introduction: 'Hi, I\'m user3!',
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await User.create({
            id: 4,
            email: 'root@example.com',
            password: pwd,
            account: 'root',
            name: 'root',
            avatar: 'https://avatars.githubusercontent.com/u/8667311?s=200&v=4',
            introduction: 'Hi, I\'m root!',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Tweet.create({
            id: 1,
            UserId: 1,
            description: 'This is the first from user1',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Tweet.create({
            id: 2,
            UserId: 1,
            description: 'This is the second from user1',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Tweet.create({
            id: 3,
            UserId: 1,
            description: 'This is the third from user1',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Tweet.create({
            id: 4,
            UserId: 2,
            description: 'This is the first from user2',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Tweet.create({
            id: 5,
            UserId: 2,
            description: 'This is the second from user2',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Tweet.create({
            id: 6,
            UserId: 2,
            description: 'This is the third from user2',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Tweet.create({
            id: 7,
            UserId: 3,
            description: 'This is the first from user3',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Tweet.create({
            id: 8,
            UserId: 3,
            description: 'This is the second from user3',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Tweet.create({
            id: 9,
            UserId: 3,
            description: 'This is the third from user3',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Reply.create({
            id: 1,
            UserId: 1,
            TweetId: 1,
            comment: 'user1 reply first from user1',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Reply.create({
            id: 2,
            UserId: 1,
            TweetId: 4,
            comment: 'user1 reply first from user2',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Reply.create({
            id: 3,
            UserId: 1,
            TweetId: 7,
            comment: 'user1 reply first from user3',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Reply.create({
            id: 4,
            UserId: 2,
            TweetId: 2,
            comment: 'user2 reply second from user1',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Reply.create({
            id: 5,
            UserId: 2,
            TweetId: 5,
            comment: 'user2 reply second from user2',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Reply.create({
            id: 6,
            UserId: 2,
            TweetId: 8,
            comment: 'user2 reply second from user3',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Reply.create({
            id: 7,
            UserId: 3,
            TweetId: 3,
            comment: 'user3 reply third from user1',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Reply.create({
            id: 8,
            UserId: 3,
            TweetId: 6,
            comment: 'user3 reply third from user2',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Reply.create({
            id: 9,
            UserId: 3,
            TweetId: 9,
            comment: 'user3 reply third from user3',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Followship.create({
            followerId: 1,
            followingId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Followship.create({
            followerId: 1,
            followingId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Followship.create({
            followerId: 2,
            followingId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Followship.create({
            followerId: 2,
            followingId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Followship.create({
            followerId: 3,
            followingId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        await Followship.create({
            followerId: 3,
            followingId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        return res.json({status: "success", message: "seeder created successfully"})
    } catch (error) {
        console.log(error)
    }
})
router.get('/current_user', passport.authenticate('get-current-user'), userController.getCurrentUser)
router.post('/signin', passport.authenticate('user-signin'), userController.signIn)
router.post('/signup', userController.signUp)
router.put('/setting', passport.authenticate('user-token'), userController.updateSetting)
router.put('/info', passport.authenticate('user-token'), upload.fields([{name: 'cover'}, {name: 'avatar'}]), userController.updateInfo)
router.get('/:id', passport.authenticate('user-token'), userController.getInfo)

module.exports = router