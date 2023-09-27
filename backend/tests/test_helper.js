const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "Testi 1000",
      author: "Meikämake",
      url: "testaus.com",
      likes: 10
    },
    {
      title: "Testi 2000",
      author: "Meikämake",
      url: "testaus.com",
      likes: 20
    },
  ]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: "Not Meikämake" })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
initialBlogs,
nonExistingId,
blogInDb,
usersInDb
}