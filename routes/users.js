const flatted = require('flatted')
const User = require('../models/user')
const {userService, postService, genreService, bookService} = require('../services') 
const Book = require('../models/book')
const Genre = require('../models/genre')

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

/*
axios.post('http://localhost:3000/users', { name: "Hilal", email: 'ab@com', phone: 232322})
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
*/

router.post('/', async(req, res)=> {
    console.log("req.body burada", req.body)
    const user = await userService.insert(req.body);
    res.send(user)
})


/*
axios.delete('/users/1964ea81-f6db-42e7-b46c-ebbe7f4b6dff')
  .then(res => {
    console.log(res.data); 
  })
  .catch(err => {
    console.error(err); 
  });
 */
router.delete('/:userId', async(req, res) => {
    await userService.removeBy('_id', req.params.userId)
    res.send('OK')
})

//update
/* 
axios.post('/users/9ace9eeb-b81a-41f5-be8b-ae1e8f46e27f/book', {
  name: 'Pragmatic Programmer',
  author: 'David Thomas',
  genre: 'Computer Science'
})
  .then(res => console.log(res.data))
  .catch(err => console.log(err));
*/


// Assuming userService and other services are defined elsewhere and imported correctly

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
      // Find the user to associate with the genre
      const user = await userService.find(req.params.userId);
      if (!user) {
          return res.status(404).send('User not found');
      }

      // Create a new genre with the name provided in the request body and associate it with the found user
      const genre = new Genre({
          name: req.body.name,
          user: user._id // Use the user's ID from the userService's find result
      });

      // Save the new genre to the database
      await genre.save();

      // Send back the created genre as a response
      res.status(201).send(genre);
  } catch (error) {
      // Handle any errors that occur during the process
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