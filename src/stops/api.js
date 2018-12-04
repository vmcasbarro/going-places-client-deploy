import apiUrl from '../apiConfig'
import { darkSkyApiKey } from '../.env.js'


export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}

export const createStop = (stop, tripId, user) => {
  return fetch(apiUrl + '/trips/' + tripId + '/stops', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      stop: {
        location: stop.location,
        date: stop.date
      }
    })
  })
}

export const getStops = (tripId, user) => {
  return fetch(apiUrl + '/trips/' + tripId + '/stops', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const getStop = (tripId, stopId, user) => {
  return fetch(apiUrl + '/trips/' + tripId + '/stops/' + stopId, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const deleteTrip = (id, user) => {
  return fetch(apiUrl + '/trips/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const getTrip = (id, user) => {
  return fetch(apiUrl + '/trips/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const renameTrip = (id, newName, user) => {
  return fetch(apiUrl + '/trips/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      trip: {
        name: newName
      }
    })
  })
}

// export const getForecast = (lat, long) => {
//   return fetch('http://localhost:4741/forecast', {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       lat: lat,
//       long: long
//     })
//   })
// }

export const getForecast = (lat, long) => {
  return fetch(apiUrl + '/forecast', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      lat: lat,
      long: long
    })
  })
}

export const getText = (imgBase64, key) => {
  return fetch(`https://vision.googleapis.com/v1/images:annotate?key=${key}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requests:[
        {
          image:{
            content: imgBase64
          },
          features:[
            {
              type: 'TEXT_DETECTION',
              maxResults: 1
            }
          ]
        }
      ]

    })
  })
}
