const BaseService = require('./base-service')
const Genre = require('../models/genre')


class GenreService extends BaseService {
    // constructor() {
    //     super(Post)
    // }
}

module.exports = new GenreService(Genre)