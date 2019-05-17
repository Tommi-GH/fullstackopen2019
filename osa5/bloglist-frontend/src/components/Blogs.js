
import React from 'react'
import Blog from './Blog'

const Blogs = ({ user, blogs, handleLike, handleDelete }) => {

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>Blogs</h2>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike}
            handleDelete={handleDelete} ownerId={user.id} />
        )
      }
    </div>
  )
}
export default Blogs