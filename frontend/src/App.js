import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggleable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([]) 

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('')
  const blogFormRef = useRef()


  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setStatus(username + ' Logged in')
      setTimeout(() => {
        setStatus("")
      }, 2000)
    } catch (exception) {
      setStatus('Wrong username or password')
      setTimeout(() => {
        setStatus("")
      }, 2000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setStatus('Added a new blog')
        setTimeout(() => {
          setStatus("")
        }, 2000)
      }).then(() => {
        blogService.getAll().then(initialBlogs => {
          setBlogs(initialBlogs)})
    })
  }

  const likeBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1}

    blogService
      .update(id, changedBlog).then(returnedBlog => {
          setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))

          })
          .then(() => {
            blogService.getAll().then(initialBlogs => {
              setBlogs(initialBlogs)})
        })
      }
      
  const removeBlog = (id) => {
    if (window.confirm("Do you really want to remove this blog?")) {
    blogService.remove(id).then(() => {
      blogService.getAll().then(initialBlogs => {
        setBlogs(initialBlogs)})
  })
  }
}

  const Notification = (props) => {
    if (props.status == "") {
      return null
    }
  
    return (
      <div className="status">
        {props.status}
      </div>
    )
  }

  const logout = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUser(null)
}

  
  return (
    <div>
      <h1>Blog App</h1>
      <div>
      <Notification status = {status} />
      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user &&
        <div>
          <h2><b>{user.name}</b> logged in <button onClick={logout}>logout</button> </h2>
          {blogs.filter(blog => blog.user.name === user.name).sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={() => likeBlog(blog.id)} removeBlog={() => removeBlog(blog.id)}/>
          )}
          <Togglable buttonLabel="new blog" ref={blogFormRef} >
            <BlogForm createBlog={addBlog}/>
          </Togglable>
        </div>
    } 
      </div>
    </div>
  )
  }

export default App