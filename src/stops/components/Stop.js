import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { handleErrors, getForecast } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import { googleMapsApiKey } from '../../.env.js'
const googleTranslate = require('google-translate')(googleMapsApiKey)
const LineChart = require('react-chartjs').Line

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
      weatherData: {},
      dailyHighs: [],
      dailyLows: []
    }



    // This binding is necessary to make `this` work in the callback
    this.onTranslate = this.onTranslate.bind(this)
    this.updateTranslation = this.updateTranslation.bind(this)
    this.getTemps = this.getTemps.bind(this)


    // get STOP id which is used by most of the methods in this class
    this.id = this.props.match.params.id

  }

  chartData = {
    labels: ['today', '+1', '+2', '+3', '+4', '+5', '+6', '+7'],
    datasets: [
      {
        label: 'Daily High Temp',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65, 59, 0, 80, 81, 56, 55, 40]
      },
      {
        label: 'Daily Low Temp',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [28, 48, 0, 40, 19, 86, 27, 90]
      }
    ]
  }

  getTemps () {
    const { daily: {data} = {}} = this.state.weatherData
    console.log(data)
    const dailyHighs = data.map((day) => {
      return day.temperatureHigh
    })
    const dailyLows = data.map((day) => {
      return day.temperatureLow
    })
    this.setState({dailyHighs: dailyHighs})
    this.setState({dailyLows: dailyLows})
    // console.log('highs', dailyHighs)
    // console.log('lows', dailyLows)
  }

  chartOptions = {

  	///Boolean - Whether grid lines are shown across the chart
  	scaleShowGridLines : true,

  	//String - Colour of the grid lines
  	scaleGridLineColor : 'rgba(0,0,0,.05)',

  	//Number - Width of the grid lines
  	scaleGridLineWidth : 1,

  	//Boolean - Whether to show horizontal lines (except X axis)
  	scaleShowHorizontalLines: true,

  	//Boolean - Whether to show vertical lines (except Y axis)
  	scaleShowVerticalLines: true,

  	//Boolean - Whether the line is curved between points
  	bezierCurve : true,

  	//Number - Tension of the bezier curve between points
  	bezierCurveTension : 0.4,

  	//Boolean - Whether to show a dot for each point
  	pointDot : true,

  	//Number - Radius of each point dot in pixels
  	pointDotRadius : 4,

  	//Number - Pixel width of point dot stroke
  	pointDotStrokeWidth : 1,

  	//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  	pointHitDetectionRadius : 20,

  	//Boolean - Whether to show a stroke for datasets
  	datasetStroke : true,

  	//Number - Pixel width of dataset stroke
  	datasetStrokeWidth : 2,

  	//Boolean - Whether to fill the dataset with a colour
  	datasetFill : true,

  	//Boolean - Whether to horizontally center the label and point dot inside the grid
  	offsetGridLines : false
  }

  onGetForecast(lat, long) {
    const { flash } = this.props
    console.log(lat, long)
    console.log(getForecast)
    getForecast(lat, long)
      .then(handleErrors)
      .then(response => response.json())
      .then((JSONresponse) => {this.setState({ weatherData: JSONresponse })})
      .then(() => this.getTemps())
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
            <div className="col-md-6" style={weatherDiv}>
              <LineChart
                data={this.chartData}
                options={this.chartOptions}
                width="500"
                height="250"
              />
            </div>
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
