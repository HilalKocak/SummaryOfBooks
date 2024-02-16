const express = require('express')


const usersRouter = require('./routes/users')
const booksRouter = require('./routes/books')
const genresRouter = require('./routes/genres')
const postsRouter = require('./routes/posts')

const indexRouter = require('./routes/index')
require('./mongo-connection')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.set('view engine', 'pug')

app.use('/users', usersRouter)
app.use('/books', booksRouter)
app.use('/genres', genresRouter)
app.use('/posts', postsRouter)

app.use('/', indexRouter)

app.listen(3000, ()=> {
    console.log('started listening on 3000')
})