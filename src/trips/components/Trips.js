import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

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
      .catch(() => flash(messages.getTripsFailure, 'flash-error'))
  }

  componentDidMount() {
    this.onGetTrips()
  }

  onDeleteTrip(event) {
    const { user } = this.props
    const id = event.target.dataset['id']

    deleteTrip(id, user)
      .then(() => {this.onGetTrips()})
  }

  render () {

    const { trips } = this.state

    const tripList = trips.map(trip=>{
      const { name, id } = trip

      return (
        <li key={id}>

          <Link to={`/trips/${id}`}>{name}</Link>
          <button data-id={id} onClick={this.onDeleteTrip}>
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
