import React from 'react'

const User = ({ user, handleLogout }) => {
  
  
  return (
    <div>
      <p>Logged in as: {user.firstName} {user.lastName}</p>
      <button onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default User