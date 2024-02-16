const mongoose = require('mongoose')

const { Schema } = mongoose; 

const PostSchema = new Schema({
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

