const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')
const User = db.User

module.exports = (app) => {
    app.use(passport.session())
    app.use(passport.initialize())
    passport.use(new LocalStrategy(
        { usernameField: 'account' }, 
        async function(account, password, done) {
            try {
                const user = await User.findOne({ where: { account }, raw: true })
                if(!user) return done(null, false)
                if(user.password !== password) return done(null, false)
                console.log(`You are ${user.account}`)
                return done(null, user)
            } catch (error) {
                console.log(error)
            }
        }
    ))

    passport.serializeUser(function(user, done) {
        return done(null, user.id)
    })

    passport.deserializeUser(async function(id, done) {
        try {
            console.log(id)
            const user = await User.findByPk(id, { raw: true })
            done(null, user)
        } catch (error) {
            console.log(error)
        }
    })
}