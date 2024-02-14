const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
  quote: String,
  book: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    autopopulate: true
  }]
});

PostSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Post', PostSchema)

