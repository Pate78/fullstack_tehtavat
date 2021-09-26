const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
      type:String,
      required: true
    },
    author: {
      type:String,
      required: true
    },
    url: {
      type:String,
      required: true
    },
    likes: {
      type:Number,
      required: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

const Blog = mongoose.model('Blog', blogSchema)

blogSchema.set('toJSON', {
    transform: (document, returnedObj) => {
      returnedObj.id = returnedObj._id.toString()
      delete returnedObj._id
      delete returnedObj.__v
    }
  })

module.exports = mongoose.model('Blog', blogSchema)