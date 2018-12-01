import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { handleErrors, createTrip, getTrip, deleteTrip } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class Trips extends Component {
  constructor (props) {
    super(props)

    this.state = {
      trip: {},
      stops: []
    }

    // This binding is necessary to make `this` work in the callback
    // this.onDeleteTrip = this.onDeleteTrip.bind(this)
    this.onGetTrip = this.onGetTrip.bind(this)

    // get trip id which is used by most of the methods in this class
    this.id = this.props.match.params.id

  }

  onGetTrip() {
    const { flash, history, user } = this.props
    const { trip } = this.state

    getTrip(this.id, user)
      .then(handleErrors)
      .then(response => response.json())
      .then((jsonResponse) => this.setState({trip: jsonResponse.trip}))
      .catch(() => flash(messages.getTripsFailure, 'flash-error'))
  }

  componentDidMount() {
    this.onGetTrip()
  }

  // onDeleteTrip(event) {
  //   const { user } = this.props
  //   const id = event.target.dataset['id']
  //
  //   deleteTrip(id, user)
  //     .then(() => {this.onGetTrips()})
  // }

  render () {
    const { trip } = this.state

    // const { trips } = this.state
    //
    // const tripList = trips.map(trip=>{
    //   const { name, id } = trip
    //
    //   return (
    //     <li key={id}>
    //
    //       <Link to={`/trips/${id}`}>{name}</Link>
    //       <button data-id={id} onClick={this.onDeleteTrip}>
    //         delete trip
    //       </button>
    //       <button data-id={id} onClick={this.onDeleteTrip}>
    //         delete trip
    //       </button>
    //     </li>
    //   )
    // })

    return(
      <React.Fragment>

        <h1>{trip.name}</h1>
        <Link exact to={ `/trips/${this.id}/rename` }>rename trip</Link>


      </React.Fragment>
    )
  }
}

export default withRouter(Trips)
