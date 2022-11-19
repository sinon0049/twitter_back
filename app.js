const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const routes = require('./routes')
const usePassport = require('./config/passport')
const session = require('express-session')
const { DatastoreStore } = require('@google-cloud/connect-datastore')
const { Datastore } = require('@google-cloud/datastore')
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    // store: new DatastoreStore({
    //     kind: 'express-sessions',
    //     dataset: new Datastore({
    //         projectId: process.env.GCLOUD_PROJECT,
    //         keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    //     })
    // })
}))
usePassport(app)
app.use(routes)
app.listen(port, () => console.log(`app is listening on port ${port}`))