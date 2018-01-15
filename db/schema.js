const mongoose = require('./connection')

const GameBoardSchema = new mongoose.Schema({
  id:     Number,
  review: String
})

const FullBoardSchema = new mongoose.Schema({
  id: Number,
  name: String,
  cover:{
    url: String,
    cloudinary_id: String,
    width: Number,
    height: Number
  },
  score: Number
})


const GameBoard = mongoose.model('GameBoard', GameBoardSchema)
const FullBoard = mongoose.model('FullBoard', FullBoardSchema)

module.exports = {GameBoard, FullBoard}
