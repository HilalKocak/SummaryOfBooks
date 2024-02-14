const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
      },
  quote: String,
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    autopopulate: true
  }
});

PostSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Post', PostSchema)

