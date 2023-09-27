import PropTypes from 'prop-types'

const Blog = ({blog, likeBlog, removeBlog}) => (
  <div>
    <p> <b>Title:</b> {blog.title}</p>
    <p> <b>Author:</b>  {blog.author}</p>
    <p> <b>Likes:</b>  {blog.likes}</p>
    <button onClick={likeBlog}>Like</button>
    <button onClick={removeBlog}>Delete</button>
    <hr></hr>
  </div> 
)
Blog.propTypes = {
  likeBlog: PropTypes.func,
  removeBlog: PropTypes.func,
  blog: PropTypes.object
}
export default Blog