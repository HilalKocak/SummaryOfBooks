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

//get genre with ID
router.get('/:genreId', async(req, res)=> {
    const genre = await genreService.find(req.params.genreId)
    if (!genre) return res.status(404).send('Can not find genre')
    res.send(genre)
    
})

//delete genre
router.delete('/delete-genre/:genreId', async(req, res) => {
    await genreService.removeBy('_id', req.params.genreId)
    res.send('OK')
})

router.patch('/:genreId', async (req, res) => {
    const genreId = req.params.genreId;
    const { name } = req.body;
  
    await genreService.update(genreId, { name });
    res.send('Updated!');
  });



module.exports = router