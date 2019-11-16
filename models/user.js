const mongoose = require('mongoose')
const shortId = require('shortid')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3
  },
  _id: {
    type: String,
    default: shortId.generate
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User