import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { handleErrors, createTrip, getTrip, deleteTrip } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class Stop extends Component {
  constructor (props) {
    super(props)


    // This binding is necessary to make `this` work in the callback
    // this.onDeleteTrip = this.onDeleteTrip.bind(this)
    // this.onGetTrip = this.onGetTrip.bind(this)

    // get trip id which is used by most of the methods in this class
    // this.id = this.props.match.params.id

  }

  // onGetTrip() {
  //   const { flash, history, user } = this.props
  //   const { trip } = this.state
  //
  //   getTrip(this.id, user)
  //     .then(handleErrors)
  //     .then(response => response.json())
  //     .then((jsonResponse) => this.setState({trip: jsonResponse.trip}))
  //     .catch(() => flash(messages.getTripsFailure, 'flash-error'))
  // }

  // componentDidMount() {
  //   this.onGetTrip()
  // }

  // onDeleteTrip(event) {
  //   const { user } = this.props
  //   const id = event.target.dataset['id']
  //
  //   deleteTrip(id, user)
  //     .then(() => {this.onGetTrips()})
  // }

  render () {


    return(
      <React.Fragment>

        <h1>Hello World (stop)</h1>

      </React.Fragment>
    )
  }
}

export default withRouter(Stop)
