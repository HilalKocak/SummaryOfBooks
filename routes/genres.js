const flatted = require('flatted')
const User = require('../models/user')
const {userService, postService, genreService, bookService} = require('../services') 

const Book = require('../models/book')
const Genre = require('../models/genre')

const router = require('express').Router()

router.get('/', async(req, res)=> {
    const genres = await genreService.load()
    res.send({genres})
    // res.render('genres', {genres}) 
})

//get user's genres
router.get('/:genreId', async(req, res)=> {
    const genre = await genreService.find(req.params.genreId)
    if (!genre) return res.status(404).send('Can not find genre')
    res.send(genre)
    
})




//delete book from user
router.delete('/delete-genre/:genreId', async(req, res) => {
    await genreService.removeBy('_id', req.params.genreId)
    res.send('OK')
})

module.exports = router