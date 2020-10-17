const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { report } = require('process')

const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, resp) => {
  resp.render('index', {
    title: 'Weather',
    name: 'Stormey Thymes'
  })
})

app.get('/about', (req, resp) => {
  resp.render('about', {
    title: 'About Me',
    name: 'I R Okapi'
  })
})

app.get('/help', (req, resp) => {
  resp.render('help', {
    title: 'Help',
    name: 'Wayne Adams',
    message: 'Have you tried buying a new computer?'
  })
})

app.get('/weather', (req, resp) => {
  if (!req.query.address) {
    return resp.send({
      error: 'You must specify an address!'
    })
  }

  geocode(req.query.address, (error, {location, lat, lon} = {}) => {
    if (error) {
      return resp.send({ error })
    } else {
      forecast(lat, lon, (error, {currentConditions: current, temperature:temp, apparentTemperature:feelsLikeTemp}) => {
        if (error) {
          return resp.send({ error })
        } else {
          resp.send({
            location: location,
            current: current,
            temp: temp,
            feelsLikeTemp: feelsLikeTemp
          })
        }
      })
    }
  })
})

app.get('/products', (req, resp) => {
  if (!req.query.search) {
    return resp.send({
      error: 'Must specify a search string!'
    })
  }

  resp.send({
    products: []
  })
})

app.get('/help/*', (req, resp) => {
  resp.render('notfound', {
    title: 'Help',
    message: 'No help available on topic ' + req.path + '. Sorry, brah!',
    name: 'Wayne Adams'
  })
})

app.get('*', (req, resp) => {
  resp.render('notfound', {
    title: 'Weather',
    message: 'Wazzzzupppp???!!  Not Found, Brah!',
    name: 'Wayne Adams'
  })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
