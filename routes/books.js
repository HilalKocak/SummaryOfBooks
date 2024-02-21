const flatted = require('flatted')
const User = require('../models/user')
const {userService, postService, genreService, bookService} = require('../services') 

const Book = require('../models/book')
const Genre = require('../models/genre')

const router = require('express').Router()

router.get('/', async(req, res)=> {
    const books = await bookService.load()
    res.status(200).send(books);
    res.render('books_posts', {books}) 
    
})

router.get('/:bookId', async (req, res) => {
    try {
        const book = await bookService.find(req.params.bookId);
        if (!book) return res.status(404).send('Book not found');
        res.status(200).send(book);
    } catch (error) {
        console.error('Error retrieving book:', error);
        res.status(500).send('Internal server error');
    }
});


//delete book 
router.delete('/delete-book/:bookId', async(req, res) => {
    await bookService.removeBy('_id', req.params.bookId)
    res.send('OK')
})

// change one property of one record
router.patch('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const { name } = req.body;
  
    await bookService.update(bookId, { name });
    res.send('Updated!');
  });

module.exports = router