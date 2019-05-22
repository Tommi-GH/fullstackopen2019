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

  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={handleCreate}>
        <div>
                    Title <input {...title} />
        </div>
        <div>
                    Author <input {...author} />
        </div>
        <div>
                    Url <input {...url} />
        </div>
        <div><button type='submit'>Create</button></div>
      </form>
    </div>
  )
}

export default CreateBlog