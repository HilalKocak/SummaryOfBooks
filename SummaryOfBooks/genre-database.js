const BaseDatabase = require('./base-database')
const Genre = require('./genre')


class GenreDatabase extends BaseDatabase {
    // constructor() {
    //     super(Post)
    // }
}

module.exports = new GenreDatabase(Genre)