const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const helper = require('./test_helper')
const User = require('../models/User')
const helperUsers = require('../misc/users_for_testing')

beforeEach(async () => {
    await User.deleteMany({})
    const users = helperUsers
        .map(user => new User(user))
    const promiseArray = users.map(user => user.save())
    await Promise.all(promiseArray)

    console.log('db initialized to', promiseArray.length, 'users')
})

describe('Getting all users', () => {
    test('Get all users return 200 and user list length grows by 1', async () => {
        await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('Adding a new user', () => {
    test('Add new user with name, username and password returns 201 and user', async () => {
        const newUser = {
            firstName: 'Etunimi',
            lastName: 'Sukunimi',
            userName: 'kayttajanimi',
            password: 'salasana',
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(201)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(helperUsers.length + 1)
    })

    test('Add new user without name returns 400', async () => {
        const newUser = {
            userName: 'kayttajanimi',
            password: 'salasana',
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(400)

    })

    test('Add new user with a password too short returns 400', async () => {
        const newUser = {
            firstName: 'Etunimi',
            lastName: 'Sukunimi',
            userName: 'kayttajanimi',
            password: 'as'
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(400)

    })

    test('Add new user without a password returns 400', async () => {
        const newUser = {
            firstName: 'Etunimi',
            lastName: 'Sukunimi',
            userName: 'kayttajanimi'
        }

        const response = await api.post('/api/users')
            .send(newUser)
            .expect(400)

        expect(response.body.error).toBe('password too short')

    })
})

afterAll(() => {
    mongoose.connection.close()
})