const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (req, resp) => {
    const body = req.body

    const user = await User.findOne({ userName: body.username })
    const passCorrect = user === null ?
        false :
        await bcrypt.compare(body.password, user.passwordHash)

    if (!user || !passCorrect) {
        return resp.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    resp.status(200)
        .send({ token, username: user.username, firstName: user.firstName, lastName: user.lastName })
})


module.exports = loginRouter