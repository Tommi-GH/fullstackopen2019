const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    let blog
    try {
        blog = await Blog.findById(request.params.id)
    } catch (ex) {
        next(ex)
    }

    if (!blog) {
        response.status(404).send()
    } else {
        response.json(blog)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes === undefined ? 0 : request.body.likes,
    })

    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch (ex) {
        next(ex)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const updatedBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    let blog
    try {
        blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    } catch (ex) {
        next(ex)
    }

    if (!blog) {
        response.status(404).send()
    } else {
        response.json(blog)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (ex) {
        next(ex)
    }
})

module.exports = blogsRouter