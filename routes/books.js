const flatted = require('flatted')
const User = require('../models/user')
const {userService, postService, genreService, bookService} = require('../services') 

const Book = require('../models/book')
const Genre = require('../models/genre')

const router = require('express').Router()

router.get('/', async(req, res)=> {
    const books = await bookService.load()
    res.render('books', {books}) 
})

router.get('/:bookId', async(req, res)=> {
    const book = await bookService.find(req.params.bookId)
    if (!book) return res.status(404).send('Can not find book')
    // res.render('books_posts', {book}) // books_posts.pug
})

//delete book 
router.delete('/delete-book/:bookId', async(req, res) => {
    await bookService.removeBy('_id', req.params.bookId)
    res.send('OK')
})



// change one property of one record
router.patch('/:bookId', async (req, res) => {
  const { bookId }= req.params.bookId
  const {name} = req.body

  await bookService.update( bookId, { name })
})


module.exports = router