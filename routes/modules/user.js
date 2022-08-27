const express = require('express')
const router = express.Router()
const db = require('../../models')
const user = db.user

router.get('/', async (req, res) => {
    const result = await user.findAll()
    res.json(result)
})

module.exports = router