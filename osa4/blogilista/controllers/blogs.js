const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
    console.log('get blogs')
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    console.log('post blog')
    const result = await blog.save()

    response.status(201).json(result)
})

module.exports = blogsRouter