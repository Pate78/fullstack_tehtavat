import React, { useState } from "react"

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
            url: url
        }
        addNewBlog(newBlog)
    }

    // LOKITUS:
    console.log('title: ', title)
    console.log('author: ', author)
    console.log('url: ',url)

    return(
        <form onSubmit={handleAddBlog}>
            Otsikko: <input type='text' value={title} onChange={handleTitleChange} /><br />
            Kirjoittaja: <input type='text' value={author} onChange={handleAuthorChange} /><br />
            Osoite: <input type='text' value={url} onChange={handleUrlChange} /><br />
            <button type='submit'>Lisää blogi!</button>
        </form>
    )
}

export default NewBlog