import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, createTrip, getTrips } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class Trips extends Component {
  constructor (props) {
    super(props)

    this.state = {
      trip: {
        name: ''
      },
      tripList: null
    }

    let tripList
  }

  createTripList(trips) {
    console.log('here!')
    console.log(trips)
    tripList = trips.map(trip=>{

      return (
        <li key={trip.id}>
          <p>
            {trip.name}
          </p>
        </li>
      )
    })
  }

  componentDidMount() {
    const { flash, history, user, setTrips, trips } = this.props

    getTrips(user)
      .then(handleErrors)
      .then(response => response.json())
      .then((jsonResponse) => this.setState({trips: jsonResponse.trips}))
      // .then(jsonResponse => setTrips(jsonResponse.trips))
      // .then(() => {console.log(trips)})
      // .then(() => this.createTripList(trips))
      // .then(() => console.log(tripList))
      .catch(() => flash(messages.getTripsFailure, 'flash-error'))

  }

  handleChange = event => {
    const newTrip = { ...this.state.trip, [event.target.name]: event.target.value }
    this.setState({ trip: newTrip })
  }

  onCreateTrip = event => {
    event.preventDefault()

    const { name } = this.state.trip
    const { flash, history, user } = this.props

    createTrip(name, user)
      .then(handleErrors)
      .then(() => flash(messages.createTripSuccess, 'flash-success'))
      // .then(() => history.push('/trips'))
      .catch(() => flash(messages.createTripFailure, 'flash-error'))
  }

  render () {
    const { name, trips } = this.state
    console.log(trips)
    //
    // tripsList = trips.map(trip=>{
    //   return (
    //     <li key={trip.id}>
    //       <p>
    //         {trip.name}
    //       </p>
    //     </li>
    //   )
    // })

    return(
      <React.Fragment>

        <h1>TRIPS</h1>
        <ul>
          <li>all your trips will show up here!</li>
          {/* {tripsList} */}

        </ul>

        <form className='create-trip-form' onSubmit={this.onCreateTrip}>

          <label>new trip</label><br/>
          <input
            required
            name="name"
            value={name}
            type="text"
            placeholder="ex, Ecuador 2019"
            onChange={this.handleChange}
          />
          <button type="submit">create your trip!</button>
        </form>

      </React.Fragment>
    )
  }
}

export default withRouter(Trips)
