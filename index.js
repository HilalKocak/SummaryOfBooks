const express = require('express')


const usersRouter = require('./routes/users')

const indexRouter = require('./routes/index')
require('./mongo-connection')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.set('view engine', 'pug')

app.use('/users', usersRouter)
app.use('/', indexRouter)

app.listen(3000, ()=> {
    console.log('started listening on 3000')
})