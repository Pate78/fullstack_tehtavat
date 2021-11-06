import React, { useState } from 'react'

// eslint-disable-next-line no-irregular-whitespace
const NewBlog = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = event => setTitle(event.target.value)
  const handleAuthorChange = event => setAuthor(event.target.value)
  const handleUrlChange = event => setUrl(event.target.value)

  const handleAddBlog = async (event) => {
    event.preventDefault()
    console.log('Adding new blog!')
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    console.log(newBlog)
    addNewBlog(newBlog)
  }

  // LOKITUS:
  // console.log('title: ', title)
  // console.log('author: ', author)
  // console.log('url: ',url)

  return(
    <form onSubmit={handleAddBlog}>
            Otsikko: <input type='text' value={title} onChange={handleTitleChange} id='title'/><br />
            Kirjoittaja: <input type='text' value={author} onChange={handleAuthorChange} id='author'/><br />
            Osoite: <input type='text' value={url} onChange={handleUrlChange} id='url'/><br />
      <button type='submit'>Lisää blogi!</button>
    </form>
  )
}

export default NewBlog