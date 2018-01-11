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

const FullBoardSchema = new mongoose.Schema({
  name: String,
  cover: { cloudinary_id: String },
  review: String
})



const GameBoard = mongoose.model('GameBoard', GameBoardSchema)
const FullBoard = mongoose.model('FullBoard', FullBoardSchema)

module.exports = {GameBoard, FullBoard}
