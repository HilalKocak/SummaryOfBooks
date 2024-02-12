const flatted = require('flatted')
const User = require('../models/user')
const {userDatabase, postDatabase, genreDatabase, bookDatabase} = require('../database') 
const Book = require('../models/book')
const Genre = require('../models/genre')

const router = require('express').Router()

router.get('/', async(req, res)=> {
    const users = await userDatabase.load()
    // res.send(flatted.stringify(users))
    res.render('users', {users}) // res.render('users', {users:users})
})

router.get('/:userId', async(req, res)=> {
    const user = await userDatabase.find(req.params.userId)
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
    const user = await userDatabase.insert(req.body);
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
    await userDatabase.removeBy('_id', req.params.userId)
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

router.post('/:userId/book', async(req, res)=> {
    const id = req.params.userId
    const user = await userDatabase.find(id)

    const { name, author, genre } = req.body
    const objectGenre = new Genre(genre)
    const book = new Book(name, author, objectGenre);

    await userDatabase.addBookToUser(user, book);
    await userDatabase.update(user)
    res.send(flatted.stringify(user))

})


// change one property of one record
router.patch('/:userId', async (req, res) => {
  const { userId }= req.params.userId
  const {name} = req.body

  await userDatabase.update( userId, { name })
})


module.exports = router