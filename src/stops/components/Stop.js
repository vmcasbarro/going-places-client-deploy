import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { handleErrors, getForecast, getStop } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import { googleMapsApiKey } from '../../.env.js'
const googleTranslate = require('google-translate')(googleMapsApiKey)
const LineChart = require('react-chartjs').Line
import StopMap from './StopMap'
import VisionTranslate from './VisionTranslate'

const loadGoogleMapsApi = require('load-google-maps-api')

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import TranslateIcon from '@material-ui/icons/Translate'
import WbSunnyIcon from '@material-ui/icons/WbSunny'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'



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

      lat: 40.7127753,
      long: -74.0059728,

      weatherData: {},
      dailyHighs: [],
      dailyLows: [],
      chartData: {
        labels: ['today', '+1', '+2', '+3', '+4', '+5', '+6', '+7'],
        datasets: [
          {
            label: 'Daily High Temp',
            fillColor: 'rgba(255, 99, 132, 0.2)',
            strokeColor: 'rgba(255,99,132,1)',
            pointColor: 'rgba(255,99,132,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(255,99,132,1)',
            data: [0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            label: 'Daily Low Temp',
            fillColor: 'rgba(54, 162, 235, 0.2)',
            strokeColor: 'rgba(54, 162, 235, 1)',
            pointColor: 'rgba(54, 162, 235, 1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(54, 162, 235, 1)',
            data: [0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    }

    // This binding is necessary to make `this` work in the callback
    this.onTranslate = this.onTranslate.bind(this)
    this.updateTranslation = this.updateTranslation.bind(this)
    this.getTemps = this.getTemps.bind(this)

    // get STOP id which is used by most of the methods in this class
    this.id = this.props.match.params.id
    this.tripId = this.props.trip.id

    const { flash } = this.props
    this.newFlash = flash
  }

  onGetLatLng() {

    let map

    loadGoogleMapsApi({key: googleMapsApiKey})
      .then((googleMaps) => {

        map = new googleMaps.Map(document.querySelector('.map'), {
          center: {
            lat: 13.434811,
            lng: 103.889144
          },
          zoom: 13,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
            {
              featureType: 'administrative',
              elementType: 'geometry.stroke',
              stylers: [{color: '#c9b2a6'}]
            },
            {
              featureType: 'administrative.land_parcel',
              elementType: 'geometry.stroke',
              stylers: [{color: '#dcd2be'}]
            },
            {
              featureType: 'administrative.land_parcel',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ae9e90'}]
            },
            {
              featureType: 'landscape.natural',
              elementType: 'geometry',
              stylers: [{color: '#dfd2ae'}]
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [{color: '#dfd2ae'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#93817c'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry.fill',
              stylers: [{color: '#a5b076'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#447530'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#f5f1e6'}]
            },
            {
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [{color: '#fdfcf8'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#f8c967'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#e9bc62'}]
            },
            {
              featureType: 'road.highway.controlled_access',
              elementType: 'geometry',
              stylers: [{color: '#e98d58'}]
            },
            {
              featureType: 'road.highway.controlled_access',
              elementType: 'geometry.stroke',
              stylers: [{color: '#db8555'}]
            },
            {
              featureType: 'road.local',
              elementType: 'labels.text.fill',
              stylers: [{color: '#806b63'}]
            },
            {
              featureType: 'transit.line',
              elementType: 'geometry',
              stylers: [{color: '#dfd2ae'}]
            },
            {
              featureType: 'transit.line',
              elementType: 'labels.text.fill',
              stylers: [{color: '#8f7d77'}]
            },
            {
              featureType: 'transit.line',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#ebe3cd'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'geometry',
              stylers: [{color: '#dfd2ae'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry.fill',
              stylers: [{color: '#b9d3c2'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#92998d'}]
            }
          ]
        })

        const geocoder = new googleMaps.Geocoder()
        const { location } = this.state.stop

        // promisify geocoder
        const geocoderPromise = function (address) {
          return new Promise((resolve, reject) => {
            geocoder.geocode(address, (results, status) => {
              if (status !== 'OK') {
                reject(err)
              } else {
                resolve(results)
              }
            })
          })
        }

        geocoderPromise( { 'address': location} )
          .then((results) => {
            this.setState({ lat: results[0].geometry.location.lat(), long: results[0].geometry.location.lng()})
            map.setCenter(results[0].geometry.location)
            const marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title: 'Hello World!'
            })
          })
          .then(() => this.onGetForecast())
          // .then((results) => {console.log(results)})
          .catch(console.error)


        // geocoder.geocode( { 'address': 'New York'}, function(results, status) {
        //   if (status == 'OK') {
        //     lat = results[0].geometry.location.lat()
        //     long = results[0].geometry.location.lng()
        //     console.log(lat, long)
        //   } else {
        //     alert('Geocode was not successful for the following reason: ' + status)
        //   }
        // })
      })
  }

  getTemps () {
    const { daily: {data} = {}} = this.state.weatherData
    const { labels } = this.state.chartData
    const dailyHighs = data.map((day) => {
      return day.temperatureHigh
    })
    const dailyLows = data.map((day) => {
      return day.temperatureLow
    })
    this.setState({dailyHighs: dailyHighs})
    this.setState({dailyLows: dailyLows})

    const newDatasets = { ...this.state.chartData.datasets }
    newDatasets[0].data = this.state.dailyHighs
    newDatasets[1].data = this.state.dailyLows

    // updating state to display new label data
    const newChartData = { ...this.state.chartData, labels: ['today', '+1', '+2', '+3', '+4', '+5', '+6', '+7'] }
    this.setState({ chartData: newChartData })

  }

  chartOptions = {

    responsive: true,

    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: 'Day'
        }
      }],
      yAxes: [{
        display: true,
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: '°C'
        }
      }]
    },


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

  onGetForecast() {
    const { flash } = this.props
    const { dailyHighs, dailyLows, lat, long } = this.state
    getForecast(lat, long)
      .then(handleErrors)
      .then(response => response.json())
      .then((JSONresponse) => {this.setState({ weatherData: JSONresponse })})
      .then(() => this.getTemps())
      .catch(() => flash(messages.apiFailure, 'flash-error'))
  }

  onGetStop() {
    const { flash, user } = this.props
    const { dailyHighs, dailyLows, lat, long } = this.state
    getStop(this.tripId, this.id, user)
      .then(handleErrors)
      .then(response => response.json())
      .then((jsonResponse) => this.setState({stop: jsonResponse.stop}))
      .then(() => this.onGetLatLng())

      .catch(() => flash(messages.getTripsFailure, 'flash-error'))
  }

  componentDidMount() {

    this.onGetStop()

    // handle stop info
    const { stops } = this.props
    const stop = stops.find(stop => stop.id == this.id)
    const number = stops.indexOf(stop) + 1
    this.setState({ stopNumber: number })

    // handle weather retrieval
    // this.onGetForecast()

    // create line chart for weather
    // this.initLineChart()

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
      'min-height': '300px'
      // 'height': '400px',
      // background: 'blue',
      // color: 'white'
    }
    const weatherDiv = {
      // height: '400px',
      // background: 'black'
    }
    const mapDiv = {
      height: '300px',
      background: 'black',
      color: 'white',
      'margin-bottom': '10vh'
    }
    const map = {
      height: '500px',
      'margin-bottom': '20px'
    }

    const container = {
      padding: 24
    }

    const paddingBottom = {
      'padding-bottom': '20px'
    }

    const { translation, stop, stopNumber, chartData } = this.state

    return(
      <React.Fragment>

        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Stop No. {stopNumber}: {stop.location} ({stop.date})
              </Typography>
            </Toolbar>
          </AppBar>
        </div>

        <div className="map" style={map}></div>

        <div style={container}>
          <Grid container spacing={24}>

            <Grid item sm={12} md={6} >
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="forecast">
                      <WbSunnyIcon/>
                    </Avatar>
                  }
                  title="7-day forcast (high/low temps in Farenheit)"
                />
                <CardContent>
                  <LineChart
                    data={chartData}
                    options={this.chartOptions}
                    width="500"
                    height="300"
                  />

                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} md={6} >
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="translate">
                      <TranslateIcon/>
                    </Avatar>
                  }
                  title="translation"
                />
                <CardContent>
                  <Typography color="textSecondary">
                    translate a phrase to English
                  </Typography>
                  <Typography style={paddingBottom} variant="h5" component="h2">
                    <form style={paddingBottom} className='translation-form' onSubmit={this.onTranslate}>
                      <input
                        required
                        name="textToTranslate"
                        value={translation.textToTranslate}
                        type="text"
                        placeholder="ex, 'Le vent se léve...'"
                        onChange={this.handleChange}
                      />
                      <br/>
                      <Button size="medium" variant="contained" color="primary" type="submit" primary={true} >
                        translate text
                      </Button>
                    </form>


                    <div className="translation-response" >
                      {translation.translatedText && <span> <code>translated text:</code> </span> }
                      {translation.translatedText}
                    </div>
                  </Typography>

                  <VisionTranslate
                    flash={this.newFlash}
                  />

                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>



      </React.Fragment>
    )
  }
}

export default withRouter(Stop)
