class Post {
    constructor(user, quote, book) {
        
        this.user = user
        this.quote = quote
        this.book = book
      
    }
   
    static create({user, quote, book}) {
        return new Post(user, quote, book)
    }
}

module.exports = Post