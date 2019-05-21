import React, { useState } from 'react'


const Blog = ({ blog, handleLike, handleDelete, ownerId }) => {
  const [expanded, setExpanded] = useState(false)
  const showWhenExpanded = { display: expanded ? '' : 'none' }
  const showWhenOwner = { display: ownerId === blog.user.id ? '':'none' }
  const style = {
    'borderStyle': 'solid',
    'borderWidth': '2px',
    'width': '25%',
    'margin':'4px'
  }

  const toggleExpanded = (event) => {
    if(event.target.type === 'submit'){
      return
    }
    setExpanded(!expanded)
  }

  return (
    <div onClick={toggleExpanded} style={style}>
      {blog.title} {blog.author}
      <div style={showWhenExpanded} className="additionalInfo">
        <div>Blog url: {blog.url}</div>
        <div>Likes: {blog.likes} <button id={blog.id} onClick={handleLike}>Like</button></div>
        <div>Added by: {blog.user.firstName} {blog.user.lastName}</div>
        <button style={showWhenOwner} id={blog.id} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default Blog