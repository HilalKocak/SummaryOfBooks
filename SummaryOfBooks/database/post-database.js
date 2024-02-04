const BaseDatabase = require('./base-database')
const Post = require('../models/post')


class PostDatabase extends BaseDatabase {
    // constructor() {
    //     super(Post)
    // }
}

module.exports = new PostDatabase(Post)