import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const loginForm = () => {
      return (
        <Login handleLogin={handleLogin} 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )
  }

  const handleLogout = () => {
    console.log("logout() !!!");
    setUser(null)
    // setShowLoginForm(true)
    window.localStorage.removeItem('appUser')
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('handleLogin button pressed!');
    const tmpUser = {
        username: username,
        password: password
    }
    console.log('tmpUser:',tmpUser);
    try {
        const loggedUser = await loginService.login(tmpUser)
        console.log('Login ok!!')
        blogService.setToken(loggedUser.token)
        setUser(loggedUser)
        console.log('Logged user: ',loggedUser);
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
        setUsername('')
        setPassword('')
        
        window.localStorage.setItem('appUser',JSON.stringify(loggedUser))
    } catch(exception) {
        console.log('Wrong credentials');
    }

}

const handleAddBlog = async (blog) => {
  console.log('Adding new blog!')
  const response = await blogService.add(blog)
  console.log('blog: ',blog)
  console.log('response: ',response)
  // setBlogs(...blogs, response)
}

const blogList = () => {
    return (
      <div>
        <NewBlog addNewBlog={handleAddBlog} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />)}
      </div>
    )
}

  return (
    <div>
      <h2>blogs</h2>
      {user !==null ? `Logged in as ${user.username}`:null}

      {user=== null ? loginForm():blogList()} 
      
      {user !== null ? <button onClick={handleLogout}>Logout</button>:<></>}
    </div>
  )
}

export default App