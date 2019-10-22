
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

//Alustus
beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

//Id kenttänimen muodon testaaminen (id, eikä _id)
/* describe('id form in response', () => {
    test('id test', async () => {
        const response = await api.get('/api/blogs/0')
        expect()
    })
}) */

//Palautettavien blogien muoto on json ja statuskoodi 200
test('Blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

//Kaikki blogit tulee kutsun mukana
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

//Lisäys onnistuu
test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'Testing hints and expreriences',
        author: 'Lyyti Laukkonen',
        url: 'tester.blogspot.com',
        likes: 30,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain(
        'Testing hints and expreriences'
    )
})

afterAll(() => {
    mongoose.connection.close()
})