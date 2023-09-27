import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({createBlog}) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')



  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,
      likes: 0
    })
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')

  }


  return (
  <div>
  <h2>Create a new blog</h2>

  <form onSubmit={addBlog}>
  <div> 
    Title
    <input
    value={newTitle}
    onChange={handleTitleChange} />
    </div>
      <div> 
    Author
    <input
    value={newAuthor}
    onChange={handleAuthorChange} />
    </div>
    <div> 
    URL
    <input
    value={newURL}
    onChange={handleURLChange} />
    </div> <br></br>
    <button type="submit">create</button>
  </form>
  </div>
)}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm