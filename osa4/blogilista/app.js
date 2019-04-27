
const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const errorHandler = require('./utils/errorHandler')
const logger = require('./utils/logger')



mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error(error)
    })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)
app.use(errorHandler)

module.exports = app