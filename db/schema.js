const mongoose = require('./connection')

const GameCardSchema = new mongoose.Schema({
  name:         String,
  image:        String,
  platform:     String,
  releaseDate:  Date,
  userScore:    Number,
  price:        Number
})

const GameCard = mongoose.model('GameCard', GameCardSchema)

module.exports = GameCard