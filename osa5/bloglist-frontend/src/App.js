import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import User from './components/User'
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [{ message, messageType }, setMessage] = useState({ message: null, messageType: null })

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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const updateBlogs = (blog) => {
    setBlogs(blogs.concat(blog))

    setMessage({ message: `Added new blog: ${blog.title} by ${blog.author}`, messageType: 'success' })
    setTimeout(() => {
      setMessage({ message: null, messageType: null })
    }, 4000)
  }

  return (
    <div>
      <Notification message={message} messageType={messageType}></Notification>
      <Login handleLogin={handleLogin} username={username} handleUsernameChange={handleUsernameChange}
        password={password} handlePasswordChange={handlePasswordChange}></Login>
      <User user={user} handleLogout={handleLogout} ></User>
      <CreateBlog user={user} updateBlogs={updateBlogs} setMessage={setMessage}></CreateBlog>
      <Blogs user={user} blogs={blogs} ></Blogs>
    </div>
  )
}

export default App