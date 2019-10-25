const User = require('../models/user')
const Blog = require('../models/blog')


const initialBlogs = [
    {
        title: 'Inspiring IoT Projects',
        author: 'Simo Siren',
        url: 'projiot.com',
        likes: 10,
    },
    {
        title: 'Gardening Fun',
        author: 'Maisa Talo',
        url: 'torplant.fi',
        likes: 8,
    }

]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}