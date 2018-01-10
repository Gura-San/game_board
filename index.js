const express         = require('express')
const hbs             = require('express-handlebars')
const cards           = require('./controllers/gameCardController')
const parser          = require('body-parser')
const methodOverride  = require('method-override')

const app = express()

app.set('port', process.env.PORT || 4000)
app.set('view engine', 'hbs')
app.engine('hbs', hbs({
  extname:        '.hbs',
  partialDir:     'views/',
  layoutsDir:     'views/',
  defaultLayout:  'layout-main'
}))

app.use(parser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('/assets', express.static('public'))
app.use('/', cards)

app.listen(app.get('port'), () => {
  console.log(`server running on port: ${app.get('port')}`)
})