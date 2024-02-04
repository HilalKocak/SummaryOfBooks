const BaseDatabase = require('./base-database')
const Genre = require('../models/genre')


class GenreDatabase extends BaseDatabase {
    // constructor() {
    //     super(Post)
    // }
}

module.exports = new GenreDatabase(Genre)