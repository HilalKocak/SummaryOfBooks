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

//get user's genres
router.get('/:userId', async(req, res)=> {
    const user = await userService.find(req.params.userId)
    if (!user) return res.status(404).send('Can not find user')
    res.render('books_posts', {user}) // books_posts.pug
})


//add book to user
router.post('/:userId/book', async(req, res)=> {
    const user = await userService.find(req.params.userId)
    await user.addQuote(req.body.quote, user);
    res.send(user)
})


//delete book from user
router.delete('/delete-genre/:genreId', async(req, res) => {
    await genreService.removeBy('_id', req.params.genreId)
    res.send('OK')
})


router.post('/:userId/genre', async (req, res) => {
    try {
        const userId = req.params.userId;
        const genre = req.body.genre;

        const user = await addGenreToUser(userId, genre);

        res.status(201).json({ message: 'Tür başarıyla kullanıcıya eklendi.', user: user });
    } catch (error) {
        console.error('Tür ekleme hatası:', error);
        res.status(500).json({ error: 'Bir hata oluştu, tür eklenemedi.' });
    }
});


// change one property of one record
router.patch('/:bookId', async (req, res) => {
  const { bookId }= req.params.bookId
  const {name} = req.body

  await bookService.update( bookId, { name })
})


module.exports = router