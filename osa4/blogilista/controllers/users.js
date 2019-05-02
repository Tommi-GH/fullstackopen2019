const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (req, resp) => {
    const users = await User.find({})
    resp.json(users)
})

usersRouter.get('/:id', async (req, resp) => {
    resp.status(404).json({ message: 'Not implemented yet' })
})

usersRouter.post('/', async (req, resp, next) => {
    const pass = req.body.password
    if (!pass || pass.length < 3) {
        return resp.status(400).json({ error: 'password too short' })
    }

    try {
        const saltrounds = 10
        const passwordHash = await bcrypt.hash(req.body.password, saltrounds)
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            passwordHash: passwordHash
        })

        const addedUser = await newUser.save()
        resp.status(201).json(addedUser)
    } catch (error) {
        next(error)
    }
})

usersRouter.put('/', async (req, resp) => {
    resp.status(404).json({ message: 'Not implemented yet' })
})

usersRouter.delete('/', async (req, resp) => {
    resp.status(404).json({ message: 'Not implemented yet' })
})

module.exports = usersRouter