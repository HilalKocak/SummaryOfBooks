class Book {
    constructor(name, author, genre) {
        this.name = name
        this.author = author
        this.genre = genre
        this.ratings = [];
    }
    addQuote(quote, user) {
        const newPost = new Post(user, quote, this);
        user.posts.push(newPost);
    }
}

module.exports = Book