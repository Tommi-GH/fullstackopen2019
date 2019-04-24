const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/Blog')
const helperBlogs = require('../misc/blogs_for_testing').blogs

beforeEach(async () => {
    console.log('removing all')
    await Blog.deleteMany({})
    console.log('adding', helperBlogs.length, 'blogs')

    const blogs = helperBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogs.map(blog => blog.save())
    await Promise.all(promiseArray)

    console.log('added', promiseArray.length, 'items')
})

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

test('identifier id returned from API', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[0])
    expect(response.body[0].id).toBeDefined()
})

test('post added via API', async () => {
    const addBlog = helperBlogs[0]
    await api.post('/api/blogs', addBlog)
        .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helperBlogs.length + 1)
})

test('post added without likes returns likes 0 API', async () => {
    const addBlog = {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        __v: 0
    }

    await api.post('/api/blogs', addBlog)
        .expect(201)
    
    const response = await api.get('/api/blogs')
    expect(response.body[response.body.length-1].likes).toBe(0)
})


afterAll(() => {
    mongoose.connection.close()
})
