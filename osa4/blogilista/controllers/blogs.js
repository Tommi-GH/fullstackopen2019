const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        response.status(404).send()
        return
    }

    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes === undefined ? 0 : request.body.likes,
    })

    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).json({ error: 'no title or url in blog' }).send()
        return
    }
    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const updatedBlog = {
        id: request.params.id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    if (!blog) {
        response.status(404).send()
        return
    }
    response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter