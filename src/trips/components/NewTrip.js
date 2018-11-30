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
      }
    }

    let tripList
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
      .then(() => {this.redirect()})
      // .then(() => history.push('/trips'))
      .catch(() => flash(messages.createTripFailure, 'flash-error'))
  }

  redirect(){
    this.props.history.push('/trips')
  }

  render () {
    const { name } = this.state

    return(
      <React.Fragment>

        <h1>NEW TRIP</h1>


        <form className='create-trip-form' onSubmit={this.onCreateTrip}>

          <br/>
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
