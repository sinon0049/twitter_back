const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const bcrypt = require('bcrypt')
const db = require('../models')
const User = db.User
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
}

module.exports = (app) => {
    app.use(passport.session())
    app.use(passport.initialize())
    passport.use('user-login', new LocalStrategy(
        { usernameField: 'account' }, 
        async function(account, password, done) {
            try {
                const user = await User.findOne({ where: { account }, raw: true })
                if(!user) return done(null, false)
                if(user.role !== 'user') return done(null, false)
                if(!await bcrypt.compare(password, user.password)) return done(null, false)
                return done(null, user)
            } catch (error) {
                console.log(error)
            }
        }
    ))

    passport.use('user-token', new JwtStrategy(opts, async function(payLoad, done) {
        const user = await User.findByPk(payLoad.userId, { raw: true })
        if(!user) return done(null, false)
        if(user.role !== 'user') return done(null, false)
        return done(null, user)
    }))

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