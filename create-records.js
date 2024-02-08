const User = require('./models/user')
const Book = require('./models/book')
const Post = require('./models/post')
const Genre = require('./models/genre')
const chalk = require('chalk')
const {userDatabase, postDatabase, genreDatabase, bookDatabase} = require('./database') 

const user1 = new User(undefined, "Hilal", "dffd", "23233")
const genre1 = new Genre("Fantasy");
const book1 = new Book("Two Secret Adversary", "Agatha Christie", genre1, user1);




console.log(chalk.yellow(user1.name));
console.log(chalk.gray(book1.genre.name));

const user2 = new User(undefined, "Arife", "23233")
const user3 = new User(undefined,"Ayse", "23233")




async function printUserHistory(userId) {
    const posts = await userDatabase.getUserPosts(userId);
    // console.log('posts', posts);
    console.log(chalk.yellow(`User Post History (ID: ${userId}):`));
   
    posts.forEach((post, index) => {
        console.log(chalk.green(`Post ${index + 1}:`), chalk.gray(post.quote));
        
    });
}



async function main() {
    await genreDatabase.save([genre1]);
    await bookDatabase.save([book1]);
    const post1 = new Post("whats going on there", book1);
    await postDatabase.save([post1]);
    await userDatabase.save([user1]);

    await userDatabase.addPostToUser(user1, post1);

    const users = await userDatabase.load();

    users.forEach(user => {
        console.log('user', user);
        printUserHistory(user.id);
    });
}

main().catch(err => {
    console.error(err);
});
