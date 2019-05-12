import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import User from './components/User'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in',username,password)

    try {
      const user = await loginService.login({
        username,password
      })
      setUser(user)
      localStorage.setItem('user',JSON.stringify(user))
      setUsername('')
      setPassword('')

    } catch(ex) {
      setErrorMessage('Username or password incorrect')
      setTimeout(()=>{
        setErrorMessage(null)
      }, 4000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const user = localStorage.getItem('user')
    if(user) {
      setUser(JSON.parse(user))
    }
  }, [])

  return (
    <div>
      <Login handleLogin={handleLogin} username={username} handleUsernameChange={handleUsernameChange}
        password={password} handlePasswordChange={handlePasswordChange}></Login>
      <p>{errorMessage}</p>
      <User user={user} ></User>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App