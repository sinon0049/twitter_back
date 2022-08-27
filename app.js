const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const usePassport = require('./config/passport')
const session = require('express-session')

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))
usePassport(app)
app.use(routes)
app.listen(port, () => console.log(`app is listening on port ${port}`))