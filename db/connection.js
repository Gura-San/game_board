const mongoose = require('mongoose')
const URL = 'mongodb://localhost/gameboard'

mongo.connect(URL, { useMongoClient: true })

mongoose.Promise = Promise

module.exports = mongoose