const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

const bcrypt = require('bcrypt')
const User = require('../models/user')
const { post } = require('superagent')
// const initialBlogs = [
//     {
//         author:'Keijo Kirjoittaja',
//         title:'Blogin otsikko',
//         url:'www.blogi.com',
//         likes:2
//     }
// ]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Uusi Blogi',
        author: 'Bertta Bloggaaja',
        url: 'www.uusiblogi.com',
        likes: 3
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(b => b.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Uusi Blogi')
})

test('blog without content is not added', async () => {
    const newBlog = {
        title: 'Uudempi Blogi'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const urls = blogsAtEnd.map(b => b.url)

    expect(urls).not.toContain(blogToDelete.url)
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'keke', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'pate',
            name: 'Pate',
            password: 'joo'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length +1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username = 'keke',
            name = 'SuperLoser',
            password = 'salakala'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})