const mongoose = require('./connection')

const GameCardSchema = new mongoose.Schema({
  name:         String,
  image:        String,
  platform:     String,
  developer:    String,
  releaseDate:  Date,
  userScore:    Number,
  price:        Number,
  onBoard:      Boolean
})

const GameCard = mongoose.model('GameCard', GameCardSchema)

module.exports = GameCard