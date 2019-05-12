import React from 'react'

const Login = ({handleLogin, username, handleUsernameChange, password, handlePasswordChange}) => {
    
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

export default Login