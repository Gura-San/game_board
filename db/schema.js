const mongoose = require('./connection')

const GameCardSchema = new mongoose.Schema({
  name:         String,
  image:        String,
  platform:     String,
  developer:    String,
  releaseDate:  Date,
  userScore:    Number,
  price:        Number,
})

const UserSchema = new mongoose.Schema({
  name:         String,
  age:          Number,
  gameBoard:    []
})


const GameCard = mongoose.model('GameCard', GameCardSchema)
const User = mongoose.model('User', UserSchema)

module.exports = { GameCard, User }