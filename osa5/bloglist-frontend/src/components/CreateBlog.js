import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ user, updateBlogs, setMessage }) => {

    if (!user) {
        return null
    }

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = async (event) => {
        event.preventDefault()
        const blog = { title, author, url }

        try {
            const res = await blogService.createBlog(blog)
            if (res) {
                updateBlogs(res)
                setTitle('')
                setAuthor('')
                setUrl('')
            }
        } catch (ex) {
            setMessage({ message: `something went wrong, blog not created`, messageType: 'error' })
            setTimeout(() => {
                setMessage({ message: null, messageType: null })
            }, 4000)
        }

    }

    return (
        <div>
            <h3>Create a new blog</h3>
            <form onSubmit={handleCreate}>
                <div>
                    Title <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
                </div>
                <div>
                    Author <input type="text" value={author} onChange={event => setAuthor(event.target.value)} />
                </div>
                <div>
                    Url <input type="text" value={url} onChange={event => setUrl(event.target.value)} />
                </div>
                <div><button type='submit'>Create</button></div>
            </form>
        </div>
    )
}

export default CreateBlog