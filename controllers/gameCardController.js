const Router  = require('express').Router()
const Card    = require('../db/schema')

//================== API Variables ==================
const igdb    = require('igdb-api-node').default

//===================================================

Router.get('/', (req, res) => {
  res.render('game-card')
})

module.exports = Router