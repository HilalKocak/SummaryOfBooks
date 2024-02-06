const chalk = require('chalk')
const User = require('./models/user')
const Book = require('./models/book')
const Post = require('./models/post')
const Genre = require('./models/genre')

const {userDatabase, postDatabase, genreDatabase, bookDatabase} = require('./database') 

const user1 = new User(undefined, "Hilal", "dffd", "23233")
const genre1 = new Genre("Fantasy");
const book1 = new Book("Two Secret Adversary", "Agatha Christie", genre1, user1);




console.log(chalk.yellow(user1.name));
console.log(chalk.gray(book1.genre.name));

const user2 = new User(undefined, "Arife", "23233")
const user3 = new User(undefined,"Ayse", "23233")
genreDatabase.save([genre1]);
bookDatabase.save([book1]);



function printUserHistory(userId) {
    const posts = userDatabase.getUserPosts(userId);
    // console.log('posts', posts);
    console.log(chalk.yellow(`User Post History (ID: ${userId}):`));
    posts.forEach((post, index) => {
        console.log(chalk.green(`Post ${index + 1}:`), chalk.gray(post.quote));
        
    });
}

const post1 = new Post("whats going on there", book1);
postDatabase.save([post1]);
userDatabase.save([user1]);
userDatabase.addPostToUser(user1, post1);
users = userDatabase.load();

users.forEach(user => {
    console.log('user', user);
    printUserHistory(user.id);
});