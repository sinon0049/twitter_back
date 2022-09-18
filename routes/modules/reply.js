const express = require('express')
const passport = require('passport')
const router = express.Router()
const db = require('../../models')
const Reply = db.Reply

router.post('/', passport.authenticate('jwt'), async (req, res) => {
    const { id } = req.user
    await Reply.create({
        UserId: id,
        ...req.body
    })
    res.json({
        status: 'success'
    })
})

module.exports = router