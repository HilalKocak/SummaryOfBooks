class User {
    constructor(name, email, phone) {
        this.name = name
        this.email = email
        this.phone = phone
    }


    follow(user) {
        this.following.push(user);
    }

    likePost(post) {
        post.likes++;
    }

    rateBook(book, rating) {
        const ratingObject = new Rating(book, this, rating);
        book.ratings.push(ratingObject);
    }

    register() {
    }

    login() {
    }
    static create({name, email}) {
        return new User(name, email)
    }
}

module.exports = User