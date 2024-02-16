const mongoose = require('mongoose')
const { Schema } = mongoose; 
const GenreSchema = new Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  }

});

GenreSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Genre', GenreSchema)

