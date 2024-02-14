const flatted = require('flatted')
const User = require('../models/user')
const {userService, postService, genreService, bookService} = require('../services') 

const Book = require('../models/book')
const Genre = require('../models/genre')

const router = require('express').Router()

router.get('/', async(req, res)=> {
    const users = await bookService.load()
    // res.send(flatted.stringify(users))
    res.render('users', {users}) // res.render('users', {users:users})
})

router.get('/:userId', async(req, res)=> {
    const user = await userService.find(req.params.userId)
    if (!user) return res.status(404).send('Can not find user')
    res.render('books_posts', {user}) // books_posts.pug
})
//65c9d75fba7647c6c1e1a3fc

// POST http://localhost:3000/users/65c9d75fba7647c6c1e1a3fc/book HTTP/1.1
// Content-Type: application/json

// {
//     "name": "Book Name",
//     "author": "Author Name",
//     "genre": "Genre Name"
// }
router.post('/:userId/book', async (req, res) => {
    try {
        const user = await userService.find(req.params.userId);
        const { name, author, genre } = req.body;

        // Genre modelinden bir nesne oluştur
        const objectGenre = await Genre.findOne({ name: genre });

        // Yeni kitap nesnesi oluştur
        const newBook = { name, author, genre: objectGenre };
        

        // Kullanıcıya kitap ekle
        await user.addBookToUser(newBook, user);
        res.send(user);
    } catch (error) {
        console.error('Error adding book to user:', error);
        res.status(500).send({ error: 'Error adding book to user' });
    }
});

//delete book from user
router.delete('/delete-book/:bookId', async(req, res) => {
    await bookService.removeBy('_id', req.params.userId)
    res.send('OK')
})



// change one property of one record
router.patch('/:bookId', async (req, res) => {
  const { bookId }= req.params.bookId
  const {name} = req.body

  await bookService.update( bookId, { name })
})


module.exports = router