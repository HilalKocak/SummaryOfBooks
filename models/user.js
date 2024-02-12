const uuid = require('uuid')

const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  posts: [],
  books: []
});

module.exports = mongoose.model('User', UserSchema)



// class User {
//     constructor(id = uuid.v4(), name, email, phone, posts, books) {
//         this.id = id;
//         this.name = name
//         this.email = email
//         this.phone = phone
//         this.posts = posts
//         this.books = books
//     }


//     follow(user) {
//         this.following.push(user);
//     }

//     likePost(post) {
//         post.likes++;
//     }

//     rateBook(book, rating) {
//         const ratingObject = new Rating(book, this, rating);
//         book.ratings.push(ratingObject);
//     }

//     register() {
//     }

//     login() {
//     }
//     static create({id, name, email, phone, posts, books}) {
//         return new User(id, name, email, phone, posts, books)
//     }
// }

// module.exports = User