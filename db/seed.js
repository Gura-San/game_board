const GameCard = require ('./schema').GameCard
const User = require ('./schema').User
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

  User.remove({})
  .then(() => {
    return User.collection.insert(SeedData)
  })
  .then((err) => {
    console.log(err)
  })
  .then(() => {
    process.exit()
  })