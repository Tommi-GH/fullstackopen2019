const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
    console.log('get blogs')
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes === undefined ? 0 : request.body.likes,
    })

    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).json({ error: 'no title or url in blog' })
    } else {
        const result = await blog.save()
        response.status(201).json(result)
    }
})

module.exports = blogsRouter