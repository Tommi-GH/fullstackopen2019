import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ handleLogin, username, password, user }) => {

  if (user){
    return null
  }

  const usernameField = { ...username, reset:null }
  const passwordField = { ...password, reset:null }

  return (
    <div className="loginForm">
      <form onSubmit={handleLogin}>
        <div>
                Username <input {...usernameField} />
        </div>
        <div>
                Password <input {...passwordField} />
        </div>
        <div><button type='submit'>Login</button></div>
      </form>
    </div>
  )}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}

export default Login