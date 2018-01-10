const mongoose = require('./connection')


// const UserSchema = new mongoose.Schema({
//   name:         String,
//   age:          Number,
//   board:    [GameBoard]
// })

const GameBoardSchema = new mongoose.Schema({
  id:     Number,
  review: String
})



const GameBoard = mongoose.model('GameBoard', GameBoardSchema)

module.exports = GameBoard
