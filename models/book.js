const mongoose = require('mongoose')
const { Schema } = mongoose; 
const BookSchema = new Schema({
  name: String,
  author: String,
  ratings: [],
  genre: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    autopopulate: true
  }]
});

BookSchema.methods.addQuote = function(quote, user) {
    const newQuote = {
      quote: quote,
      user: user._id
    };
    
    this.posts.push(newQuote);
    return this.save();
  };
  
BookSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Book', BookSchema)

