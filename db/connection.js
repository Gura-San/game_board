const mongoose = require('mongoose')
const URL = 'mongodb://localhost/gameboard'

mongoose.connect(URL, { useMongoClient: true })

mongoose.Promise = Promise

module.exports = mongoose