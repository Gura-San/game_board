const mongoose = require('mongoose')
const URL = 'mongodb://localhost/gameboard'

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL)
} else {
  mongoose.connect(URI);
}

//mongoose.connect(URL, { useMongoClient: true })

mongoose.Promise = Promise

module.exports = mongoose
