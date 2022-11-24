const db = require('../models')
const User = db.User
const Tweet = db.Tweet
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { ImgurClient} = require('imgur')
const fs = require('fs')

module.exports = {
    getCurrentUser: async (req, res) => {
        try {
            const result = await User.findByPk(req.user.id)
            res.json(result)
        } catch (error) {
            console.log(error)
        }
    },
    signIn: (req, res) => {
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
    },
    signUp: async(req, res) => {
        try {
            const [listCheckEmail, listCheckAccount] = await Promise.all([
                User.findAll({where: { email: req.body.email}}),
                User.findAll({where: { account: req.body.account}})
            ])
            if(listCheckAccount.length) {
                return res.json({
                    status: 'error',
                    message: 'Account has been already used.'
                })
            }
            if(listCheckEmail.length) {   
                return res.json({
                    status: 'error',
                    message: 'Email has been already used.'
                })
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            await User.create({
                ...req.body,
                password: hashedPassword,
                role: 'user'
            })
            return res.json({
                status: 'success',
                message: 'Sign up successfully'
            })
        } catch (error) {
            console.log(error)
        }   
    },
    updateSetting: async (req, res) => {
        try {
            const userId = req.user.id
            const user = await User.findByPk(userId)
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            await user.update({
                ...req.body,
                password: hashedPassword
            })
            res.json({
                status: 'success',
                message: 'User settings updated successfully.'
            })
        } catch (error) {
            console.log(error)
        }
    },
    updateInfo: async (req, res) => {
        try {
            //get name and introduction
            const { name, introduction } = req.body
            //get file paths
            const coverPath = req.files.cover ? req.files.cover[0].path : null
            const avatarPath = req.files.avatar ? req.files.avatar[0].path : null
            console.log(coverPath, avatarPath)
            //imgur settings
            const client = new ImgurClient({
                clientId: process.env.IMGUR_CLIENT_ID,
                clientSecret: process.env.IMGUR_CLIENT_SECRET,
                refreshToken: process.env.IMGUR_REFRESH_TOKEN,
                accessToken: process.env.IMGUR_ACCESS_TOKEN,
            })
            //initialize imgur response
            let coverRes = null
            let avatarRes = null
            //upload images to imgur and delete local images after upload
            if(coverPath) {
                coverRes = await client.upload({
                    image: fs.createReadStream(coverPath),
                    album: process.env.IMGUR_ALBUM_ID
                })
                fs.unlink(coverPath, (err) => {
                    if(err) throw new Error(err)
                    console.log(`${coverPath} has been deleted`)
                })
            }
            if(avatarPath) {
                avatarRes = await client.upload({
                    image: fs.createReadStream(avatarPath),
                    album: process.env.IMGUR_ALBUM_ID
                })
                fs.unlink(avatarPath, (err) => {
                    if(err) throw new Error(err)
                    console.log(`${avatarPath} has been deleted`)
                })
            }
            console.log(coverRes, avatarRes)
            //update database
            const user = await User.findByPk(req.user.id)
            const payLoad = {
                name,
                introduction
            }
            //update avatar and cover if user upload new ones
            if(avatarRes) payLoad.avatar = avatarRes.data.link
            if(coverRes) payLoad.cover = coverRes.data.link
            await user.update(payLoad)
            //respond
            res.json({
                status: 'success',
                message: 'user info successfully updated',
                avatar: user.avatar,
                cover: user.cover,
                name: user.name,
                introduction: user.introduction
            })
        } catch (error) {
            console.log(error)
        }
    },
    getInfo: async (req, res) => {
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
    }
}