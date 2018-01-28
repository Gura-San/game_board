const mongoose = require('./connection')

// I think your models have some display logic in them, width and height. You'll generally want to just keep that in CSS and use a class. 
const CoverSchema = new mongoose.Schema({
  url:                  String,
  cloudinary_id:        String,
  width:                Number,
  height:               Number
})

// I think the logic of your models could be improved by having them be specialized a bit more. This will also improve the clarity and simplicity of the controller code.

const GameBoardSchema = new mongoose.Schema({
  id:                   Number,
  name:                 String,
  review:               String,
  storyline:            String,
  aggregated_rating:    Number,
  developers:         [ Number ], // this should be [String], i think, if it's developer names.
  first_release_date:   Number, //Date
  cover:              [ CoverSchema ],
  userReview:           String
})

const ClipBoardSchema = new mongoose.Schema({
  // Are you trying to create a tagging/favorite-ing model?

  // It seems like you might be using this model primary to synchronize updates between the local GameBoard models containing data pulled from the API at particular point in time and the data on the API itself: the user can update the id match the server

  // I would instead just have that update logic on gameboard itself

  // You could reference the GameBoard schema itself here. See links below.
  id:                   Number
})

// Here a series of links for dealing with references between models in mongoose that 
// might yield a more satisfying implementaion for your models

// https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
// http://mongoosejs.com/docs/4.x/docs/populate.html
// https://stackoverflow.com/questions/17244825/mongoose-linking-objects-to-each-other-without-duplicating/17246508
// https://stackoverflow.com/questions/34985846/mongoose-document-references-with-a-one-to-many-relationship
// https://stackoverflow.com/questions/40877612/mongoose-should-i-add-refs-to-parent-docs-child-docs-or-both



// This schema seems redundant
const MemoBoardSchema = new mongoose.Schema({
  id:                   Number
})



// Lines like these register the schema on the Mongoose instance, the variable
// `mongoose` here in your code, and you can use .model as a getter in other modules
// you import the model into
// const MemoBoard = mongoose.model('MemoBoard', MemoBoardSchema)
const GameBoard = mongoose.model('GameBoard', GameBoardSchema)
const ClipBoard = mongoose.model('ClipBoard', ClipBoardSchema)
const MemoBoard = mongoose.model('MemoBoard', MemoBoardSchema)

module.exports = { GameBoard, ClipBoard, MemoBoard }
// You can also export the mongoose instance itself, and use mongoose.model('GameBoard')
// to access or 'get' the model (.model method: 1 argument getter method, 2 arguments 
// setter method)
