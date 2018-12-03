import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { handleErrors, createTrip, getTrip, deleteTrip } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import googleMapsApiKey from '../../.env.js'
const googleTranslate = require('google-translate')(googleMapsApiKey)

class Stop extends Component {
  constructor (props) {
    super(props)

    this.state = {
      translation: {
        textToTranslate: '',
        translatedText: ''
      },
      translations: []
    }


    // This binding is necessary to make `this` work in the callback
    this.onTranslate = this.onTranslate.bind(this)
    this.updateTranslation = this.updateTranslation.bind(this)
    // this.onGetTrip = this.onGetTrip.bind(this)

    // get trip id which is used by most of the methods in this class
    // this.id = this.props.match.params.id

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
  // onGetTrip() {
  //   const { flash, history, user } = this.props
  //   const { trip } = this.state
  //
  //   getTrip(this.id, user)
  //     .then(handleErrors)
  //     .then(response => response.json())
  //     .then((jsonResponse) => this.setState({trip: jsonResponse.trip}))
  //     .catch(() => flash(messages.getTripsFailure, 'flash-error'))
  // }

  // componentDidMount() {
  //   this.onGetTrip()
  // }

  // onDeleteTrip(event) {
  //   const { user } = this.props
  //   const id = event.target.dataset['id']
  //
  //   deleteTrip(id, user)
  //     .then(() => {this.onGetTrips()})
  // }

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

    const { translation } = this.state

    return(
      <React.Fragment>

        <h1>Hello World (stop)</h1>
        <div className="container">
          <div className="row">
            <div className="col-6" style={translationDiv}>
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
            <div className="col-6" style={weatherDiv}>weather</div>
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
