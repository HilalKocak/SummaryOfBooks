const BaseService = require('./base-service')
const Book = require('../models/book')


class BookService extends BaseService {
    // constructor() {
    //     super(Post)
    // }
 

}

module.exports = new BookService(Book)