
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))

    const favouriteBlog = blogs.find(blog => blog.likes === maxLikes)

    return {
        title: favouriteBlog.title,
        author: favouriteBlog.author,
        likes: favouriteBlog.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}