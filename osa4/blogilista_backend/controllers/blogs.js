const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
    console.log(request);
    Blog
      .find({})
      .then(blogs => {
          console.log(blogs);
          response.json(blogs.map(blog => blog.toJSON()))
      })
      .catch(error => next(error))
  })
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            console.log(result);
            response.json(result)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter