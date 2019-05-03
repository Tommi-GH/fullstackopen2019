const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const testHelper = require('./test_helper')
const Blog = require('../models/Blog')
const User = require('../models/User')
const helperBlogs = require('../misc/blogs_for_testing').blogs
const jwt = require('jsonwebtoken')
const helperUsers = require('../misc/users_for_testing')

describe('with initialized db', () => {
    let token

    beforeEach(async () => {
        await Blog.deleteMany({})
        const blogs = helperBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogs.map(blog => blog.save())
        await Promise.all(promiseArray)

        console.log('db initialized to', promiseArray.length, 'blogs')

        await User.deleteMany({})
        const newUser = new User(helperUsers[0])
        await newUser.save()

        const user = await User.findOne({})
        const userForToken = {
            username: user.userName,
            id: user.id
        }
        const tokenSignature = await jwt.sign(userForToken, process.env.SECRET)
        token = `Bearer ${tokenSignature}`
    })

    describe('getting all blogs', () => {
        test('blogs as json returned from API', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('all blogs are returned from API', async () => {
            const response = await api.get('/api/blogs')
            expect(response.body.length).toBe(helperBlogs.length)
        })
    })

    describe('getting single blogs', () => {

        test('identifier id returned from API', async () => {
            const response = await api.get('/api/blogs')
            expect(response.body[0].id).toBeDefined()
        })

        test('single blog with matching id returned from API', async () => {
            const blogs = await testHelper.blogsInDb()
            const blog = blogs.find(blog => blog.id === '5a422a851b54a676234d17f7')

            const expectedBlog = {
                'author': 'Michael Chan',
                'id': '5a422a851b54a676234d17f7',
                'likes': 7,
                'title': 'React patterns',
                'url': 'https://reactpatterns.com/',
                'user': {
                    'firstName': 'Etunimi1',
                    'id': '5ccb123eb8a7042420838cce',
                    'lastName': 'Sukunimi1',
                    'userName': 'kayttajanimi1',
                }
            }

            const response = await api.get(`/api/blogs/${blog.id}`)
            expect(response.body).toEqual(expectedBlog)
        })

        test('single blog with nonmatching id returns 404 from API', async () => {
            await api
                .get('/api/blogs/5a422a851b54a676234d17f1')
                .expect(404)
        })
    })

    describe('adding new blogs', () => {
        test('post added via API', async () => {
            const addBlog = {
                title: 'Go To Statement Considered Harmful',
                likes: '5',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
            }
            await api.post('/api/blogs')
                .set('Authorization', token)
                .send(addBlog)
                .expect(201)

            const blogsAtEnd = await testHelper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helperBlogs.length + 1)
        })

        test('post added without likes returns likes 0 API', async () => {
            const addBlog = {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
            }

            await api.post('/api/blogs')
                .set('Authorization', token)
                .send(addBlog)
                .expect(201)
            const blogsAtEnd = await testHelper.blogsInDb()
            expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
        })


        test('post added without title and url returns 400 API', async () => {
            const addBlog = {
                likes: 10,
                author: 'Edsger W. Dijkstra'
            }

            await api.post('/api/blogs')
                .set('Content-Type', 'application/json')
                .set('Authorization', token)
                .send(addBlog)
                .expect(400)

        })
    })

    describe('removing blogs', () => {
        test('delete blog with valid id and user token is removed from db API', async () => {
            const blogs = await testHelper.blogsInDb()
            const blogId = blogs[0].id
            await api.delete(`/api/blogs/${blogId}`)
                .set('Authorization', token)
                .expect(204)

            const blogsAtEnd = await testHelper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helperBlogs.length - 1)
        })

        test('delete blog with valid id and invalid user token does not affect db API', async () => {
            const blogs = await testHelper.blogsInDb()
            const blogId = blogs[0].id
            await api.delete(`/api/blogs/${blogId}`)
                .set('Authorization', token)
                .expect(204)

            const blogsAtEnd = await testHelper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helperBlogs.length - 1)
        })

        test('delete blog with invalid id does not affect db API', async () => {
            await api.delete('/api/blogs/5a422a851b54a676234d17f1')
                .set('Authorization', token)
                .expect(204)
            const blogsAtEnd = await testHelper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helperBlogs.length)
        })
    })

    describe('updating blogs', () => {
        test('adding 1 like to blog with valid id is saved to db API', async () => {
            const blogs = await testHelper.blogsInDb()
            const blog = blogs.find(blog => blog.id === '5a422a851b54a676234d17f7')
            const updateBlog = {
                ...blog,
                likes: 5,
            }

            const expectedBlog = {
                'author': 'Michael Chan',
                'id': '5a422a851b54a676234d17f7',
                'likes': 7,
                'title': 'React patterns',
                'url': 'https://reactpatterns.com/',
                'user': {
                    'firstName': 'Etunimi1',
                    'id': '5ccb123eb8a7042420838cce',
                    'lastName': 'Sukunimi1',
                    'userName': 'kayttajanimi1',
                }
            }

            console.log(blog)

            const response = await api.get(`/api/blogs/${blog.id}`)
            expect(response.body).toEqual(expectedBlog)

            await api.put(`/api/blogs/${blog.id}`)
                .send(updateBlog)
                .expect(200)

            const response2 = await api.get(`/api/blogs/${blog.id}`)
            expect(response2.body).toEqual({ ...expectedBlog, likes: 5 })
        })

        test('adding 1 like to blog with invalid id does not affect db API', async () => {
            const blogs = await testHelper.blogsInDb()
            const updateBlog = blogs[0]

            await api.put('/api/blogs/5a422a851b54a676234d17f1')
                .send(updateBlog)
                .expect(404)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})
