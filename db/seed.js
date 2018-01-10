const GameBoard = require ('./schema')
const SeedData = require('./seeds.json')

GameBoard.remove({})
  .then(() => {
    return GameBoard.collection.insert(SeedData)
  })
  .then((err) => {
    console.log(err)
  })
  .then(() => {
    process.exit()
  })