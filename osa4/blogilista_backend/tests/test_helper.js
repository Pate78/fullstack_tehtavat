const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
        author:'Keijo Kirjoittaja',
        title:'Blogin otsikko',
        url:'www.blogi.com',
        likes:2
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        title:'Uusin Blogi',
        author:'Keijo Kirjoittaja',
        url:'www.bloggeri.com',
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb,usersInDb
}