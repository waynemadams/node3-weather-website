const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const city = search.value
  const url = 'http://localhost:3000/weather?address=' + city
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetch(url).then((resp) => {
    resp.json().then((data) => {
      if (data.error) {
        messageOne.textContent = 'Error for location "' + city + '": ' + data.error
      } else {
        messageOne.textContent = ''
        messageTwo.textContent = 'location: ' + data.location +
          '; currentConditions: ' + data.current + '; temperature: ' + data.temp +
          '; apparentTemperature: ' + data.feelsLikeTemp
      }
    })
  })
  })