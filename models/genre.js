const mongoose = require('mongoose')
const { Schema } = mongoose; 
const GenreSchema = new Schema({
  name: String,
});

GenreSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Genre', GenreSchema)

