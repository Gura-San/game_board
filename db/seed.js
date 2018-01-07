const GameCard = require ('./schema')
const SeedData = require('./seeds.json')

GameCard.remove({})
  .then(() => {
    return GameCard.collection.insert(SeedData)
  })
  .then((err) => {
    console.log(err)
  })
  .then(() => {
    process.exit()
  })