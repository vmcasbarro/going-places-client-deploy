import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { handleErrors, getForecast } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import { googleMapsApiKey, darkSkyApiKey } from '../../.env.js'
const googleTranslate = require('google-translate')(googleMapsApiKey)
const DarkSky = require('dark-sky')
const darksky = new DarkSky(darkSkyApiKey)

class Stop extends Component {
  constructor (props) {
    super(props)

    this.state = {
      translation: {
        textToTranslate: '',
        translatedText: ''
      },
      translations: [],
      stop: {},
      stopNumber: null,
      weatherData: {}
    }



    // This binding is necessary to make `this` work in the callback
    this.onTranslate = this.onTranslate.bind(this)
    this.updateTranslation = this.updateTranslation.bind(this)
    // this.onGetTrip = this.onGetTrip.bind(this)

    // get STOP id which is used by most of the methods in this class
    this.id = this.props.match.params.id
  }

  onGetForecast(lat, long) {
    const { flash } = this.props
    console.log(lat, long)
    console.log(getForecast)
    getForecast(lat, long)
      .then(handleErrors)
      .then(response => response.json())
      .then((JSONresponse) => {this.setState({ weatherData: JSONresponse })})
      .catch(() => flash(messages.apiFailure, 'flash-error'))
  }

  componentDidMount() {
    // handle stop info
    const { stops } = this.props
    const stop = stops.find(stop => stop.id == this.id)
    const number = stops.indexOf(stop) + 1
    console.log(number)
    this.setState({ stop: stop })
    this.setState({ stopNumber: number })

    // handle weather retrieval
    this.onGetForecast('42.369401', '-71.101173')

  }

  handleChange = event => {
    const newTranslation = { ...this.state.translation, [event.target.name]: event.target.value }
    this.setState({ translation: newTranslation })
  }

  updateTranslation = data => {
    const newTranslation = { ...this.state.translation, translatedText: data }
    this.setState({ translation: newTranslation })
  }

  onTranslate (event) {
    const { translation, translatedText } = this.state
    event.preventDefault()

    // promisify googleTranslate API call
    const transPromise = function (text, language) {
      return new Promise((resolve, reject) => {
        googleTranslate.translate(text, language, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    }

    transPromise(translation.textToTranslate, 'en')
      .then((data) => {this.updateTranslation(data.translatedText)})
      .catch(console.error)

  }

  render () {


    const translationDiv = {
      'height': '300px',
      background: 'blue',
      color: 'white'
    }
    const weatherDiv = {
      height: '300px',
      background: 'green'
    }
    const mapDiv = {
      height: '300px',
      background: 'black',
      color: 'white'
    }

    const { translation, stop, stopNumber } = this.state

    return(
      <React.Fragment>

        <h1>Stop No. {stopNumber}: {stop.location}</h1>
        <h3>{stop.date}</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-6" style={translationDiv}>
              translation
              <form className='translation-form' onSubmit={this.onTranslate}>
                <br/>
                <input
                  required
                  name="textToTranslate"
                  value={translation.textToTranslate}
                  type="text"
                  placeholder="ex, 'Le vent se léve...'"
                  onChange={this.handleChange}
                />
                <button type="submit">translate text</button>
              </form>
              <div className="translation-response" >{translation.translatedText}</div>
            </div>
            <div className="col-md-6" style={weatherDiv}>weather</div>
          </div>
          <div className="row">
            <div className="col-12" style={mapDiv}>map</div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default withRouter(Stop)
