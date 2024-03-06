const User = require('./models/user')
const Book = require('./models/book')
const Post = require('./models/post')
const Genre = require('./models/genre')
const chalk = require('chalk')
const {userService, postService, genreService, bookService} = require('./services') 

const printUserHistory = require('./lib/print-user-history')
const user1 = new User(undefined, "Hilal", "dffd", "23233")
const genre1 = new Genre("Fantasy");
const book1 = new Book("Two Secret Adversary", "Agatha Christie", genre1);




console.log(chalk.yellow(user1.name));
console.log(chalk.gray(book1.genre.name));

const user2 = new User(undefined, "Arife", "23233")
const user3 = new User(undefined,"Ayse", "23233")





async function main() {
    await genreService.save([genre1]);

    await bookService.save([book1]);
    const post1 = new Post("whats going on there", book1);
    await postService.save([post1]);
    await userService.save([user1]);
    

    

    await userService.addPostToUser(user1, post1);
    await userService.addBookToUser(user1, book1);

    const users = await userService.load();

    users.forEach(user => {
        console.log('user', user);
        printUserHistory(user);
    });
}

main().catch(err => {
    console.error(err);
});
