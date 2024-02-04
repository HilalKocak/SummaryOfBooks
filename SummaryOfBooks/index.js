const chalk = require('chalk')
const User = require('./models/user')
const Book = require('./models/book')
const Post = require('./models/post')
const Genre = require('./models/genre')

const {userDatabase, postDatabase, genreDatabase, bookDatabase} = require('./database') 

const user1 = new User("Hilal", "dffd", "23233")
const genre1 = new Genre("Fantasy");
const book1 = new Book("Two Secret Adversary", "Agatha Christie", genre1, user1);
const post1 = new Post(user1, "I like this line", book1);

userDatabase.save([user1]);
postDatabase.save([post1]);
// db.save('newfile', [{"name": "Hilal", "surname":"Kocak"}])
console.log(chalk.yellow(user1.name));
console.log(chalk.gray(book1.genre.name));

const user2 = new User("Arife", "23233")
const user3 = new User("Ayse", "23233")
genreDatabase.save([genre1]);
postDatabase.save([post1]);
bookDatabase.save([book1]);

// db.save('newfile', [user1])

// db.insert('newfile', user2)
// db.insert('newfile', user3)
// db.remove('newfile', 1)
// const user = db.findByName('newfile', 'Ayse')
// console.log(user)
// const names_read = db.load('newfile')
// console.log(names_read)

// userDatabase.save([user2, user3])

// const userObj = userDatabase.findByName('Arife')
// const user = User.create(userObj);
// user.addPost('This is dr alpha', new Book('book alpha', 'hilal', 'fantesy'))
// userDatabase.save([user])

// userDatabase.create({'name':'newname', 'email':'email'})