class Post {
    constructor(quote, book) {
        

        this.quote = quote
        this.book = book
      
    }
   
    static create({quote, book}) {
        return new Post(quote, book)
    }
}

module.exports = Post