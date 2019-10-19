const dummy = array => {
    return 1
}

const totalLikes = array => {
    const Likes = (array.map(a => a.likes))
    const reducer = (accumulator, currentValue) => accumulator + currentValue

    return (Likes.reduce(reducer))
}

const favoriteBlog = array => {
    const Likes = (array.map(a => a.likes))
    const greatest = Math.max(...Likes)

    for (i = 0; i < array.length; i++) {
        if (array[i].likes === greatest) {
            return (({ author, likes, title }) => ({ author, likes, title }))(array[i])
        }
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}
