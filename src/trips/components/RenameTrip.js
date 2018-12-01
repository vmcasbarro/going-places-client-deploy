import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, createTrip, getTrips, getTrip, renameTrip } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class RenameTrip extends Component {
  constructor (props) {
    super(props)

    this.state = {
      trip: {
        name: ''
      },
      newName: ''
    }

    // get trip id which is used by most of the methods in this class
    this.id = this.props.match.params.id

    this.onGetTrip = this.onGetTrip.bind(this)


  }

  handleChange = event => {
    this.setState({ newName: event.target.value })
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

  onRenameTrip = event => {
    const { flash, history, user } = this.props
    const { newName } = this.state

    event.preventDefault()

    renameTrip(this.id, newName, user)
      .then(handleErrors)
      .then(() => flash(messages.renameTripSuccess, 'flash-success'))
      .then(() => {this.redirect()})
      .catch(() => flash(messages.renameTripFailure, 'flash-error'))
    //
    // const { name } = this.state.trip
    // const { flash, history, user } = this.props
    //
    // createTrip(name, user)
    //   .then(handleErrors)
    //   .then(() => flash(messages.createTripSuccess, 'flash-success'))
    //   .then(() => {this.redirect()})
    //   // .then(() => history.push('/trips'))
    //   .catch(() => flash(messages.createTripFailure, 'flash-error'))
  }

  redirect(){
    this.props.history.push(`/trips/${this.id}`)
  }

  render () {
    const { trip, newName } = this.state
    console.log(this.id)

    return(
      <React.Fragment>

        <h1>{trip.name}</h1>


        <form className='rename-trip-form' onSubmit={this.onRenameTrip}>

          <br/>
          <input
            required
            name="newName"
            value={newName}
            type="text"
            placeholder="ex, Ecuador 2019"
            onChange={this.handleChange}
          />
          <button type="submit">rename trip</button>
        </form>

      </React.Fragment>
    )
  }
}

export default withRouter(RenameTrip)
