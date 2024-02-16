const flatted = require('flatted')
const User = require('../models/user')
const {userService, postService, genreService, bookService} = require('../services') 
const Book = require('../models/book')
const Genre = require('../models/genre')
const Post = require('../models/post')

const router = require('express').Router()

router.get('/', async(req, res)=> {
    const users = await userService.load()
    // res.send(flatted.stringify(users))
    res.render('users', {users}) // res.render('users', {users:users})
})

router.get('/:userId', async(req, res)=> {
    const user = await userService.find(req.params.userId)
    if (!user) return res.status(404).send('Can not find user')
    res.render('books_posts', {user}) // books_posts.pug
})


router.post('/', async(req, res)=> {
    console.log("req.body burada", req.body)
    const user = await userService.insert(req.body);
    res.send(user)
})



router.delete('/:userId', async(req, res) => {
    await userService.removeBy('_id', req.params.userId)
    res.send('OK')
})



router.post('/:userId/book', async (req, res) => {
  try {
      const { userId } = req.params;
      const { name, author, genreId } = req.body;

    
      const book = new Book({
          user: userId,
          name,
          author,
          genre: genreId
      });

      await book.save();
      res.status(201).send(book);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

//add genre to user
router.post('/:userId/genre', async (req, res) => {
  try {
      const user = await userService.find(req.params.userId);
      if (!user) {
          return res.status(404).send('User not found');
      }

      const genre = new Genre({
          name: req.body.name,
          user: user._id 
      });

      await genre.save();
      res.status(201).send(genre);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
});

//add post to user
router.post('/:userId/post', async (req, res) => {
  try {
      const user = await userService.find(req.params.userId);
      if (!user) {
          return res.status(404).send('User not found');
      }

      const post = new Post({
        quote: req.body.quote,
        user: user._id,
        book: req.body.bookId
      });

      await post.save();
      res.status(201).send(post);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
});

// change one property of one record
router.patch('/:userId', async (req, res) => {
  const { userId }= req.params.userId
  const {name} = req.body

  await userService.update( userId, { name })
})


module.exports = router