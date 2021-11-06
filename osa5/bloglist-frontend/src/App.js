import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('appUser')
    if (loggedUser !== null) {
      const lUser = JSON.parse(loggedUser)
      console.log('lUser: ',lUser)
      setUser(lUser)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      blogService.setToken(lUser.token)
    }
  }, [])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLoginNameChange = event => setUsername(event.target.value)
  const handlePasswordChange = event => setPassword(event.target.value)

  const login = () => {
    const hideWhenVisible = { display: loginVisible ? 'none':'' }
    const showWhenVisible = { display: loginVisible ? '':'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleSubmit={handleSubmit}
            handleLoginNameChange={handleLoginNameChange}
            handlePasswordChange={handlePasswordChange}
            username={username}
            password={password}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    console.log('logout() !!!')
    setUser(null)
    // setShowLoginForm(true)
    window.localStorage.removeItem('appUser')
    setLoginVisible(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log('handleLogin button pressed!')
    const tmpUser = {
      username: username,
      password: password
    }
    console.log('tmpUser:',tmpUser)
    try {
      const loggedUser = await loginService.login(tmpUser)
      console.log('Login ok!!')
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      console.log('Logged user: ',loggedUser)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      setUsername('')
      setPassword('')

      window.localStorage.setItem('appUser',JSON.stringify(loggedUser))
    } catch(exception) {
      console.log('Wrong credentials')
      setNotificationMessage('wrong creadentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }

  }

  const handleAddBlog = async (blog) => {
    console.log('Adding new blog!')
    const response = await blogService.add(blog)
    console.log('blog: ',blog)
    console.log('response: ',response)
    setBlogs([...blogs, response])
    blogFormRef.current.toggleVisibility()
  // setBlogs(...blogs, response)
  }

  const addLike = async (id) => {
    // console.log('addLike button pressed: ', id)
    const blog = blogs.find(b => b.id === id)
    // console.log('blog: ',blog, 'id: ', id)
    const changedBlog = { ...blog, likes: blog.likes+1 }
    await blogService.update(changedBlog)
    setBlogs(blogs.map(b => {
      // console.log('b: ', b, 'response: ', response, 'blog.id !== id: ',b.id !== id)
      return(b.id !== id ? b : changedBlog)
    }))
    console.log('updated blogs: ', blogs)
  }

  const removeBlog = async (id) => {
    await blogService.remove(id)
    setBlogs(blogs.filter(b => {
      // console.log('b: ', b, 'response: ', response, 'blog.id !== id: ',b.id !== id)
      b.id === id
    }))
  }

  const blogList = () => {
    return (
      <div>
        <Togglable buttonLabel='New blog' ref={blogFormRef}>
          <NewBlog addNewBlog={handleAddBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog}/>)}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>blogs</h2>
      {user !==null ? `Logged in as ${user.username}`:null}

      {user=== null ? login():blogList()}

      {user !== null ? <button onClick={handleLogout}>Logout</button>:<></>}

    </div>
  )
}

export default App