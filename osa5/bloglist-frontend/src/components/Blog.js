import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, addLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div className='singleBlogEntry' style={blogStyle}>
      title: {blog.title}, author: {blog.author}
      <Togglable buttonLabel='Näytä kaikki tiedot'>
        <div>url: {blog.url}</div>
        <div>likes: {blog.likes}</div>
        <button className='likeButton' onClick={() => addLike(blog.id)}>like</button>
        <button className='removeButton' onClick={() => removeBlog(blog.id)}>remove</button>
      </Togglable>
    </div>
  )
}

export default Blog