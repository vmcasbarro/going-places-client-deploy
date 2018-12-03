import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import {  } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import googleMapsApiKey from '../../.env.js'

const loadGoogleMapsApi = require('load-google-maps-api')

class MyMap extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }


  }

  componentDidMount() {
    // es6 destructuring of this.props
    const { stops } = this.props

    const arrayOfLocations = stops.map(stop => stop.location)
    // console.log(arrayOfLocations)

    // break out first stop as a variable to reference
    const firstStop = stops[0]
    // initialize map variable which will be the instance of google map
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
        const address = firstStop.location

        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == 'OK') {
            map.setCenter(results[0].geometry.location)
            const marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title: 'Hello World!'
            })
          } else {
            alert('Geocode was not successful for the following reason: ' + status)
          }
        })

        arrayOfLocations.forEach(location => {
          geocoder.geocode( { 'address': location}, function(results, status) {
            if (status == 'OK') {
              const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: 'this is a stop on the trip'
              })
            } else {
              alert('Geocode was not successful for the following reason: ' + status)
            }
          })
        })
      })

      .catch(function (error) {
        console.error(error)
      })
  }



  render () {
    const styles = {
      height: '500px'
    }



    return(
      <React.Fragment>

        <h1>Trip Map!</h1>
        <div className="map" style={styles}></div>



      </React.Fragment>
    )
  }
}

export default withRouter(MyMap)
