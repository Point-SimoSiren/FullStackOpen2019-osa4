
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Inspiring IoT Projects',
        author: 'Simo Siren',
        url: 'projiot.com',
        likes: 10
    },
    {
        title: 'Gardening Fun',
        author: 'Maisa Talo',
        url: 'torplant.fi',
        likes: 8
    }

]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

describe('viewing a specific blog', () => {
    test('return blog of right array index', async () => {
        const blogsAtStart = initialBlogs

        const noteToView = blogsAtStart[0]

        const result = await api
            .get('/api/blogs/')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(result.body[0].url).toEqual(noteToView.url)
    })
})

test('Blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
})


afterAll(() => {
    mongoose.connection.close()
})