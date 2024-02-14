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


//add post to user
router.post('/:userId/post', async(req, res)=> {
    const user = await userService.find(req.params.userId)
    await user.addQuote(req.body.quote, user);
    res.send(user)
})


//delete post from user
router.delete('/delete-post/:postId', async(req, res) => {
    await postService.removeBy('_id', req.params.userId)
    res.send('OK')
})


router.post('/:userId/post', async (req, res) => {
    try {
        const userId = req.params.userId;
        const post = req.body.post;

        // Kullanıcıya gönderi eklemek için addPostToUser fonksiyonunu kullan
        const updatedUser = await addPostToUser(userId, post);

        res.status(201).json({ message: 'Gönderi başarıyla kullanıcıya eklendi.', user: updatedUser });
    } catch (error) {
        console.error('Gönderi ekleme hatası:', error);
        res.status(500).json({ error: 'Bir hata oluştu, gönderi eklenemedi.' });
    }
});

// change one property of one record
router.patch('/:bookId', async (req, res) => {
  const { bookId }= req.params.bookId
  const {name} = req.body

  await bookService.update( bookId, { name })
})


module.exports = router