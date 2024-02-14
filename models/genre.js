const mongoose = require('mongoose')
const GenreSchema = new mongoose.Schema({
  name: String,
});

PostSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Genre', GenreSchema)

