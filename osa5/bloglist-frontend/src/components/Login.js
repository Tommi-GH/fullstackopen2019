import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => {

  if (localStorage.getItem('user')){
    return null
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
                Username <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
                Password <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div><button type='submit'>Login</button></div>
      </form>
    </div>
  )}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default Login