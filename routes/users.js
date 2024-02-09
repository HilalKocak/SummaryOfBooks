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
    res.render('users', {user}) // users.pug
})

module.exports = router