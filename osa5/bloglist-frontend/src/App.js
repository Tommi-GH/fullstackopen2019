import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import User from './components/User'
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [{ message, messageType }, setMessage] = useState({ message: null, messageType: null })
  const createBlogRef = React.createRef()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')

    } catch (ex) {
      setMessage({ message: 'Username or password incorrect', messageType: 'error' })
      setTimeout(() => {
        setMessage({ message: null, messageType: null })
      }, 4000)
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const compareBlogs = (blog1, blog2) => {
    return blog2.likes - blog1.likes
  }

  useEffect(() => {
    getBlogs()
  }, [])

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort(compareBlogs))
  }

  useEffect(() => {
    const user = localStorage.getItem('user')

    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const addBlog = (blog) => {
    createBlogRef.current.toggleVisibility()
    setBlogs(blogs
      .concat(blog)
      .sort(compareBlogs)
    )
    setMessage({ message: `Added new blog: ${blog.title} by ${blog.author}`, messageType: 'success' })
    setTimeout(() => {
      setMessage({ message: null, messageType: null })
    }, 4000)
  }

  const updateBlog = (newBlog) => {
    setBlogs(blogs
      .map(blog => blog.id !== newBlog.id ? blog : newBlog)
      .sort(compareBlogs)
    )
  }

  const handleLike = async (event) => {
    const blog = await blogs.find(blog => event.target.id === blog.id)
    const newBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await blogService.updateBlog(newBlog)
      updateBlog(newBlog)
    } catch (ex) {
      setMessage({ message: `something went wrong, blog not updated. Message: ${ex}`, messageType: 'error' })
      setTimeout(() => {
        setMessage({ message: null, messageType: null })
      }, 4000)
    }
  }

  const removeBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const handleDelete = async (event) => {
    const id = event.target.id
    const blog = blogs.find(blog => blog.id === id)
    const confirm = window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}`)
    if (!confirm) {
      return
    }

    try {
      await blogService.deleteBlog(id)
      removeBlog(id)

    } catch (ex) {
      console.log(ex)
      setMessage({ message: `Something went wrong, blog not deleted. ${ex}`, messageType: 'error' })
      setTimeout(() => {
        setMessage({ message: null, messageType: null })
      }, 4000)
    }

  }

  const loginForm = () => {
    return (<Login handleLogin={handleLogin} username={username} handleUsernameChange={handleUsernameChange}
      password={password} handlePasswordChange={handlePasswordChange} user={user}></Login>)

  }




  return (
    <div>
      <Notification message={message} messageType={messageType}></Notification>

      {user === null ?
        loginForm() :
        <User user={user} handleLogout={handleLogout} ></User>
      }

      <Togglable buttonLabel='New blog' ref={createBlogRef} user={user}>
        <CreateBlog user={user} updateBlogs={addBlog} setMessage={setMessage}></CreateBlog>
      </Togglable>
      <Blogs user={user} blogs={blogs} handleLike={handleLike} handleDelete={handleDelete} ></Blogs>
    </div>
  )
}

export default App