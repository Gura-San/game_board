const GameBoard = require ('./schema')
const SeedData = require('./seeds.json')

// formatting nitpick
GameBoard.remove({})
  .then(() => GameBoard.collection.insert(SeedData))
  .catch((err) => console.log(err)) // use .catch instead of .then
  .then(() => process.exit())
