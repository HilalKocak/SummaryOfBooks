const BaseDatabase = require('./base-database')
const Book = require('../models/book')


class BookDatabase extends BaseDatabase {
    // constructor() {
    //     super(Post)
    // }
 

}

module.exports = new BookDatabase(Book)