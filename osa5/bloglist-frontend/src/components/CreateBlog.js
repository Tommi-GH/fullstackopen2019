import React from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'

const CreateBlog = ({ user, updateBlogs: addBlog, setMessage }) => {

  if (!user) {
    return null
  }

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = { title: title.value, author:author.value, url:url.value }

    try {
      const res = await blogService.createBlog(blog)
      if (res) {
        addBlog(res)
        title.reset()
        author.reset()
        url.reset()
      }
    } catch (ex) {
      setMessage({ message: 'something went wrong, blog not created. Message: ',ex, messageType: 'error' })
      setTimeout(() => {
        setMessage({ message: null, messageType: null })
      }, 4000)
    }

  }

  const titleField = { ...title, reset:'' }
  const authorField = { ...author, reset:'' }
  const urlField = { ...url, reset:'' }

  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={handleCreate}>
        <div>
                    Title <input {...titleField} />
        </div>
        <div>
                    Author <input {...authorField} />
        </div>
        <div>
                    Url <input {...urlField} />
        </div>
        <div><button type='submit'>Create</button></div>
      </form>
    </div>
  )
}

export default CreateBlog