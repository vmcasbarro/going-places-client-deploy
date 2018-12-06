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

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import MapIcon from '@material-ui/icons/Map'
import PublicIcon from '@material-ui/icons/Public'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'


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

    const container = {
      padding: 24
    }

    const tripList = trips.map(trip=>{
      const { name, id } = trip

      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
          <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="stop">
                  <MapIcon/>
                </Avatar>
              }
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                <Link to={`/trips/${id}`}>{name} </Link>
              </Typography>
              <Typography color="textSecondary">
                <button className="btn btn-sm btn-outline-warning" data-id={id} onClick={this.onDeleteTrip}>
                  delete trip
                </button>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )

    })

    return(
      <React.Fragment>
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Trips
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div style={container}>
          <Grid container spacing={24}>
            {tripList}

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="new stop">
                      <PublicIcon/>
                    </Avatar>
                  }
                  title="Where to next?"
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <Link exact to={ '/trips/new-trip' }>add trip</Link>
                  </Typography>
                  <Typography color="textSecondary">
                    create a new trip!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(Trips)
