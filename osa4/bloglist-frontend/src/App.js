import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    if(user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [user])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginForm = () => {
      return (
        <Login handleLogin={handleLogin} 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          user={user}
          handleLogout={handleLogout}/>
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
        setUser(loggedUser)
        console.log('Logged user: ',loggedUser);
        setUsername('')
        setPassword('')
        
        window.localStorage.setItem('appUser',JSON.stringify(loggedUser))
    } catch(exception) {
        console.log('Wrong credentials');
    }

}
  const blogList = () => {
      return (
        <div>
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
      
      {user !== null ? <button onClick={logout}>Logout</button>:<></>}
    </div>
  )
}

export default App