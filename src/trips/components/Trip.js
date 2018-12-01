import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { handleErrors, createTrip, getTrip, deleteTrip } from '../api'
import { getStops } from '../../stops/api'
import messages from '../messages'
import { messages as stopMessages } from '../../stops/messages'
import apiUrl from '../../apiConfig'

import AuthenticatedRoute from '../../auth/components/AuthenticatedRoute'
import Map from '../../maps/components/Map'

class Trip extends Component {
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

  async componentDidMount() {
    const { flash, history, user } = this.props

    await this.onGetTrip()
    getStops(this.id, user)
      .then(handleErrors)
      .then(response => response.json())
      .then((jsonResponse) => this.setState({stops: jsonResponse.stops}))
      .catch(() => flash(messages.getStopsFailure, 'flash-error'))


  }

  // onDeleteTrip(event) {
  //   const { user } = this.props
  //   const id = event.target.dataset['id']
  //
  //   deleteTrip(id, user)
  //     .then(() => {this.onGetTrips()})
  // }

  render () {
    const { flash, user } = this.props
    const { trip, stops } = this.state

    const stopList = stops.map(stop=>{
      const { location, date, id } = stop

      return (
        <li key={id}>

          <Link to={`/trips/${this.id}/stops/${id}`}>{location}</Link>
          <br/>
          <p>{date}</p>

        </li>
      )
    })

    return(
      <React.Fragment>



        <h1>{trip.name}</h1>
        <Link exact to={ `/trips/${this.id}/rename` }>rename trip</Link>
        <br/>
        <Link exact to={ `/trips/${this.id}/map` }>map trip!</Link>
        <br/>


        { stopList }

        <Link exact to={ `/trips/${this.id}/add-stop` }>add stop</Link>

        <Map tripData={this.state}/>


      </React.Fragment>
    )
  }
}

export default withRouter(Trip)