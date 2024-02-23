const mongoose = require('mongoose')
const { Schema } = mongoose; 
const BookSchema = new Schema({
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
        required: true
      },
  name: String,
  author: String,
  ratings: [],
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    autopopulate: true
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    autopopulate: true
  }]
});


  
BookSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Book', BookSchema)

