const express = require('express')
const hbs = require('express-handlebars')
const cards = require('./controllers/gameCardController')
const parser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')

const app = express()

app.set('port', process.env.PORT || 4000)
app.set('view engine', 'hbs')
app.engine('hbs', hbs({
  extname: '.hbs',
  partialDir: 'views/',
  layoutsDir: 'views/',
  defaultLayout: 'layout-main'
}))

app.use(parser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('/assets', express.static('public'))
app.use(cors())
app.use('/', cards)

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
