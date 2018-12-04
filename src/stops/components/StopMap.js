import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'

import messages from '../messages'
import apiUrl from '../../apiConfig'

// google maps key and wrapper
import { googleMapsApiKey } from '../../.env.js'
const loadGoogleMapsApi = require('load-google-maps-api')


class StopMap extends Component {
  constructor (props) {
    super(props)

    this.state = {
      locLat: 1.352083,
      locLong: 103,
      stop: {}
    }

    // This binding is necessary to make `this` work in the callback
    // this.componentDidMount = this.componentDidMount.bind(this)

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.value !== this.props.value){
      this.setState({stop:nextProps.value})
    }
  }

  onGetStop() {
    const { flash } = this.props
    const { dailyHighs, dailyLows, lat, long } = this.state
    getStop(this.tripId, this.id, user)
      .then(handleErrors)
      .then(response => response.json())
      .then((jsonResponse) => this.setState({stop: jsonResponse.stop}))
      .then(() => this.onGetLatLng())

      .catch(() => flash(messages.getTripsFailure, 'flash-error'))
  }

  componentDidMount() {
    // destructure stop passed in as a prop from Stop
    const { stop } = this.state
    // this returns an empty object, not sure why...
    console.log('what stop?', stop)

    // initialize map variable which will be the instance of google map
    let map

    // load google Maps API, which returns a promise
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
        const address = stop.location
        let lat
        let long

        geocoder.geocode( { 'address': 'New York'}, function(results, status) {
          if (status == 'OK') {
            map.setCenter(results[0].geometry.location)
            lat = results[0].geometry.location.lat()
            long = results[0].geometry.location.lng()
            console.log(lat, long)
            const marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title: 'Hello World!'
            })
          } else {
            alert('Geocode was not successful for the following reason: ' + status)
          }
        })


      })


  }

  render () {
    const styles = {
      height: '500px'
    }

    const { title } = this.props



    return(
      <React.Fragment>

        <h1>{title}</h1>
        <div className="map" style={styles}></div>



      </React.Fragment>
    )
  }
}

export default withRouter(StopMap)
