const flatted = require('flatted')
const User = require('../models/user')
const {userDatabase, postDatabase, genreDatabase, bookDatabase} = require('../database') 

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

module.exports = router