const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const loc = document.querySelector('#loc')
const conditions = document.querySelector('#conditions')
const temperature = document.querySelector('#temperature')
const apparentTemp = document.querySelector('#apparentTemp')
const humidity = document.querySelector('#humidity')

loc.textContent = ''

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const city = search.value
  const url = '/weather?address=' + city
  loc.textContent = 'Loading...'
  conditions.textContent = ''
  temperature.textContent = ''
  apparentTemp.textContent = ''
  humidity.textContent = ''
  fetch(url).then((resp) => {
    resp.json().then((data) => {
      if (data.error) {
        loc.textContent = 'Error for location "' + city + '": ' + data.error
      } else {
        loc.textContent = 'location: ' + data.location
        conditions.textContent = 'current conditions: ' + data.current
        temperature.textContent = 'temperature: ' + data.temp
        apparentTemp.textContent = 'apparent temperature: ' + data.feelsLikeTemp
        humidity.textContent = 'relative humidity: ' + data.humidity + '%'
      }
    })
  })
  })