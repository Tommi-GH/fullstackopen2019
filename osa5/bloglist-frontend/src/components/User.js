import React from 'react'

const User = (user) => {
    if(user === null){
        return null
    }
    console.log(user)
    console.log(user.firstName)
    return (
        <div>
            <p>Logged in as:</p>
            <p>{user.firstName} {user.lastName}</p>
        </div>
    )
}

export default User