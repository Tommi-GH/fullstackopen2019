const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/Blog')
const helperBlogs = require('../misc/blogs_for_testing').blogs

describe('when there is initially some blogs saved', () => {
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
        expect(response.body[0].id).toBeDefined()
    })
})

describe('getting single blogs', () => {
    test('single blog with matching id returned from API', async () => {
        const response = await api.get('/api/blogs/5a422a851b54a676234d17f7')
        expect(response.body).toEqual({
            id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
        })
    })

    test('no matching id returns 404 from API', async () => {
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
            .send(addBlog)
            .expect(201)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helperBlogs.length + 1)
    })

    test('post added without likes returns likes 0 API', async () => {
        const addBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        }

        await api.post('/api/blogs')
            .send(addBlog)
            .expect(201)

        const response = await api.get('/api/blogs')
        expect(response.body[response.body.length - 1].likes).toBe(0)
    })


    test('post added without title and url returns 400 API', async () => {
        const addBlog = {
            likes: 10,
            author: 'Edsger W. Dijkstra'
        }

        await api.post('/api/blogs')
            .send(addBlog)
            .expect(400)

    })
})

describe('removing blogs', () => {
    test('delete blog with valid id is removed from db API', async () => {
        await api.delete('/api/blogs/5a422a851b54a676234d17f7')
            .expect(204)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helperBlogs.length - 1)
    })

    test('delete blog with invalid id does not affect db API', async () => {
        await api.delete('/api/blogs/5a422a851b54a676234d17f1')
            .expect(204)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helperBlogs.length)
    })
})

describe('editing blogs', () => {
    test('adding 1 like to blog with valid id is saved to db API', async () => {
        const updateBlog = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 5,
        }
        await api.put('/api/blogs/5a422a851b54a676234d17f7')
            .send(updateBlog)
            .expect(200)

        const response = await api.get('/api/blogs/5a422a851b54a676234d17f7')
        expect(response.body).toEqual({
            id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 5,
        })
    })

    test('adding 1 like to blog with invalid id does not affect db API', async () => {
        const updateBlog = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 5,
        }
        await api.put('/api/blogs/5a422a851b54a676234d17f1')
            .send(updateBlog)
            .expect(404)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
