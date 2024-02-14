const mongoose = require('mongoose')
const BookSchema = new mongoose.Schema({
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
  
PostSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Post', BookSchema)

