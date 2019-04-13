const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const blogs = require('../misc/blogs_for_testing').blogs

    test('total likes', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favourite blog', () => {
    const blogs = require('../misc/blogs_for_testing').blogs

    test('most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })
})