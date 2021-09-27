const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        console.log(authorization)
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    // console.log(request)
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(b => b.toJSON()))
    // Blog
    //   .find({})
    //   .then(blogs => {
    //       console.log(blogs);
    //       response.json(blogs.map(blog => blog.toJSON()))
    //   })
    //   .catch(error => next(error))
  })
  
blogsRouter.post('/', async (req, res) => {
    const body = req.body
    console.log('req.body:',body);
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        author: user.username,
        title: body.title,
        url: body.url,
        likes: body.likes || 0,
        user:user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()

})

module.exports = blogsRouter