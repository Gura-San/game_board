const Router      = require('express').Router()
const Card        = require('../db/schema')

//================== API Variables ==================
// const client  = require('../keys/keys').client
// const url         = require('../keys/keys').url
//===================================================


Router.get('/', (req, res) => {
  res.render('game-card')
  console.log(url)
})

module.exports = Router
