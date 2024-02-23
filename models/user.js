const mongoose = require('mongoose')
const { Schema } = mongoose; 
const UserSchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  email: String,
  phone: String,
  // books: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Book',
  //   autopopulate: true
  // }],
  // genres: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Genre',
  //   autopopulate: true
  // }]
});

UserSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('User', UserSchema)

