const uuid = require('uuid')
class User {
    constructor(id = uuid.v4(), name, email, phone, posts) {
        this.id = id;
        this.name = name
        this.email = email
        this.phone = phone
        this.posts = posts
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
    static create({id, name, email}) {
        return new User(id, name, email)
    }
}

module.exports = User