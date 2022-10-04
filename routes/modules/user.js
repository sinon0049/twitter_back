const express = require('express')
const passport = require('passport')
const router = express.Router()
const db = require('../../models')
const User = db.User
const Tweet = db.Tweet
const jwt = require('jsonwebtoken')
const { ImgurClient} = require('imgur')
const multer = require('multer')
const fs = require('fs')

//multer settings
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'temp/')
    },
    filename: function(req, file, cb) {
        if(file.mimetype === 'image/jpeg') cb(null, file.originalname + '.jpg') 
    }
})
const upload = multer({ storage })

//routes
router.get('/current_user', passport.authenticate('jwt'), async (req, res) => {
    try {
        const result = await User.findByPk(req.user.id)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

router.post('/signin', passport.authenticate('local'), (req, res) => {
    try {
        const data = req.user
        const userId  = req.user.id
        const token = jwt.sign({ userId }, 'secret')
        res.send({
            ...data,
            token
        })
    } catch (error) {
        console.log(error)
    }
})

router.put('/info', passport.authenticate('jwt'), upload.fields([{name: 'cover'}, {name: 'avatar'}]), async (req, res) => {
    try {
        //get name and introduction
        const { name, introduction } = req.body
        //get file paths
        const coverPath = req.files.cover[0].path
        const avatarPath = req.files.avatar[0].path
        //imgur settings
        const client = new ImgurClient({
            clientId: process.env.IMGUR_CLIENT_ID,
            clientSecret: process.env.IMGUR_CLIENT_SECRET,
            refreshToken: process.env.IMGUR_REFRESH_TOKEN,
            accessToken: process.env.IMGUR_ACCESS_TOKEN,
        })
        //upload images to imgur
        const coverRes = await client.upload({
            image: fs.createReadStream(coverPath),
            album: process.env.IMGUR_ALBUM_ID
        })
        const avatarRes = await client.upload({
            image: fs.createReadStream(avatarPath),
            album: process.env.IMGUR_ALBUM_ID
        })
        console.log(coverRes, avatarRes)
        //update database
        const user = await User.findByPk(req.user.id)
        user.update({
            avatar: avatarRes.data.link,
            cover: coverRes.data.link,
            name,
            introduction
        })
        //delete temp files
        fs.unlink(avatarPath, (err) => {
            if(err) throw new Error(err)
            console.log(`${avatarPath} has been deleted`)
        })
        fs.unlink(coverPath, (err) => {
            if(err) throw new Error(err)
            console.log(`${coverPath} has been deleted`)
        })
        //response
        res.json({
            status: 'user info successfully updated',
            avatar: avatarRes.data.link,
            cover: coverRes.data.link
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', passport.authenticate('jwt'), async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id, {
            include: [
                { model: User, as: 'Followers', attributes: ['id', 'name', 'account', 'avatar']},
                { model: User, as: 'Followings', attributes: ['id', 'name', 'account', 'avatar']},
                { model: Tweet, as: 'Likes' }
            ],
            attributes: ['id', 'name', 'account', 'introduction', 'avatar', 'cover'],
        })
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router