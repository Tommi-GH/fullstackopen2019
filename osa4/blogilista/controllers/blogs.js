const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')

    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    let blog
    try {
        blog = await Blog.findById(request.params.id).populate('user')
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

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'authorization token not valid' })
        }

        const user = await User.findById(decodedToken.id)

        if(!user) {
            return response.status(401).json({ error: 'user not found' })
        }

        const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes === undefined ? 0 : request.body.likes,
            user: user._id
        })

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
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'authorization token not valid' })
        }

        const user = await User.findById(decodedToken.id)

        if(!user) {
            return response.status(401).json({ error: 'user not found' })
        }

        const blog = await Blog.findById(request.params.id)

        if(!blog) {
            return response.status(404).json({ error: 'blog not found' })
        }

        if(blog.user.toString() !== user.id.toString()){
            return response.status(401).json({ error: 'must be blog owner to delete' })
        }

        await Blog.findByIdAndDelete(blog.id)
        response.status(204).end()
    } catch (ex) {
        next(ex)
    }
})

module.exports = blogsRouter