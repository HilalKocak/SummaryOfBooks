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
router.get('/:genreId', async(req, res)=> {
    const genre = await genreService.find(req.params.userId)
    if (!user) return res.status(404).send('Can not find genre')
    res.render('books_posts', {genre}) // books_posts.pug
})




//delete book from user
router.delete('/delete-genre/:genreId', async(req, res) => {
    await genreService.removeBy('_id', req.params.genreId)
    res.send('OK')
})

module.exports = router