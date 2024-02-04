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

    static create({name, author, genre}) {
        return new Book(name, author, genre)
    }
}

module.exports = Book