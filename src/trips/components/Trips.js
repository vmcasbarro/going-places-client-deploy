import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, createTrip, getTrips, deleteTrip } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class Trips extends Component {
  constructor (props) {
    super(props)

    this.state = {
      trips: []
    }

    // This binding is necessary to make `this` work in the callback
    this.onDeleteTrip = this.onDeleteTrip.bind(this)

  }

  onGetTrips() {
    const { flash, history, user, setTrips } = this.props
    const { trips } = this.state

    getTrips(user)
      .then(handleErrors)
      .then(response => response.json())
      .then((jsonResponse) => this.setState({trips: jsonResponse.trips}))
      .then(() => {console.log(trips)})
      // .then(jsonResponse => setTrips(jsonResponse.trips))
      // .then(() => {console.log(trips)})
      // .then(() => this.createTripList(trips))
      // .then(() => console.log(tripList))
      .catch(() => flash(messages.getTripsFailure, 'flash-error'))
  }

  componentDidMount() {
    this.onGetTrips()
  }

  onDeleteTrip(event) {
    const { user } = this.props
    const id = event.target.dataset['id']

    deleteTrip(id, user)
      .then(console.log)
      .then(() => {this.onGetTrips()})
  }

  render () {

    const { trips } = this.state

    const tripList = trips.map(trip=>{
      return (
        <li key={trip.id}>
          <p>
            {trip.name}
          </p>
          <button data-id={trip.id} onClick={this.onDeleteTrip}>
            delete trip
          </button>
          <button data-id={trip.id} onClick={this.onDeleteTrip}>
            delete trip
          </button>
        </li>
      )
    })

    return(
      <React.Fragment>

        <h1>TRIPS</h1>
        <ul>
          {tripList}
        </ul>

      </React.Fragment>
    )
  }
}

export default withRouter(Trips)
