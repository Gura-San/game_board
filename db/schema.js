const mongoose = require('./connection')

const CoverSchema = new mongoose.Schema({
  url:                  String,
  cloudinary_id:        String,
  width:                Number,
  height:               Number
})

const GameBoardSchema = new mongoose.Schema({
  id:                   Number,
  name:                 String,
  review:               String,
  storyline:            String,
  aggregated_rating:    Number,
  developers:         [ Number ],
  first_release_date:   Number,
  cover:              [ CoverSchema ],
  userReview:           String
})

const ClipBoardSchema = new mongoose.Schema({
  id:                   Number
})

const MemoBoardSchema = new mongoose.Schema({
  id:                   Number
})


const GameBoard = mongoose.model('GameBoard', GameBoardSchema)
const ClipBoard = mongoose.model('ClipBoard', ClipBoardSchema)
const MemoBoard = mongoose.model('MemoBoard', MemoBoardSchema)

module.exports = { GameBoard, ClipBoard, MemoBoard }
