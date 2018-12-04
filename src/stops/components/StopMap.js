import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { handleErrors, createTrip, getTrips, deleteTrip } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class StopMap extends Component {
  constructor (props) {
    super(props)

    this.state = {

    }

    // This binding is necessary to make `this` work in the callback
    // this.onDeleteTrip = this.onDeleteTrip.bind(this)

  }

  componentDidMount() {
  }

  render () {

    const { title, stop } = this.props

    return(
      <React.Fragment>

        <h1>{title}</h1>

      </React.Fragment>
    )
  }
}

export default StopMap
