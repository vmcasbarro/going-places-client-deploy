import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { handleErrors, createTrip, getTrips, deleteTrip } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'


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
    console.log(event)
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

          <Link to={`/trips/${id}`}>{name} </Link>
          <button className="btn btn-sm btn-outline-warning" data-id={id} onClick={this.onDeleteTrip}>
            delete trip
          </button>

        </li>
      )
    })

    return(
      <React.Fragment>

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper>xs=12</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
        </Grid>


        <h1>TRIPS</h1>
        <ul>
          {tripList}
        </ul>

      </React.Fragment>
    )
  }
}

export default withRouter(Trips)
