const request = require('postman-request')

//http://api.weatherstack.com/
//cf9469d0d7d08300b3f5110c31922d0a
//https://api.mapbox.com/
//pk.eyJ1Ijoid2F5bmVtYWRhbXMiLCJhIjoiY2tmdDdwc3FzMGZucDMwcXFlMnAzc2w1ZiJ9.hEQoKE0eE6l2hc5mFFmApQ
//example:
// https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoid2F5bmVtYWRhbXMiLCJhIjoiY2tmdDdwc3FzMGZucDMwcXFlMnAzc2w1ZiJ9.hEQoKE0eE6l2hc5mFFmApQ&limit=1

const weatherStackToken = 'cf9469d0d7d08300b3f5110c31922d0a'
const forecast = (lat, lon, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=' +
              weatherStackToken + '&units=f&query=' + lat + ',' +
              lon
  request( { url, json: true }, (err, {body}) => {
    if (err) {
    callback('Unable to connect to weather service.', undefined)
  } else if (body.error) {
    callback('HTTP ' + body.error.code + ': ' + body.error.info, undefined)
  } else {
    const data = body.current
    callback(undefined, {
      currentConditions: data.weather_descriptions[0],
      temperature: data.temperature,
      apparentTemperature: data.feelslike 
    })
    }
  })
}

module.exports = forecast