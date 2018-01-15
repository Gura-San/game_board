const mongoose = require('./connection')

const CoverSchema = new mongoose.Schema({
  url: String,
  cloudinary_id: String,
  width: Number,
  height: Number
})

const GameBoardSchema = new mongoose.Schema({
  id:     Number,
  review: String,
  storyline: String,
  aggregated_rating: Number,
  developers: [ Number ],
  first_release_date: Number,
  cover: [ CoverSchema ]
})


const FullBoardSchema = new mongoose.Schema({
  name: String,
  cover: { cloudinary_id: String },
  review: String
})



const GameBoard = mongoose.model('GameBoard', GameBoardSchema)
const FullBoard = mongoose.model('FullBoard', FullBoardSchema)

module.exports = {GameBoard, FullBoard}
