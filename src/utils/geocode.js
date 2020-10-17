const { builtinModules } = require('module')
const request = require('postman-request')

const geocode = (address, callback) => {
    const mapboxToken = 'pk.eyJ1Ijoid2F5bmVtYWRhbXMiLCJhIjoiY2tmdDdwc3FzMGZucDMwcXFlMnAzc2w1ZiJ9.hEQoKE0eE6l2hc5mFFmApQ'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
                encodeURIComponent(address) + '.json?access_token=' +
                mapboxToken + '&limit=1'
  
    //request( { url: url, json: true }, (err, response) => {
    request( { url, json: true }, (err, {body} = {}) => {
      if (err) {
        callback('Unable to retrieve geo coordinates.', undefined)
      } else {
        if (body.features.length === 0) {
          callback('No matches found!', undefined)
        } else {
          const data = body.features[0]
          callback(undefined, { 'location': body.features[0].place_name,
                                'lat': data.center[1], 
                                'lon': data.center[0], 
                              })
        }
      }
    })
}

module.exports = geocode