import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { handleErrors, createTrip, getTrip, deleteTrip } from '../api'
import { getStops } from '../../stops/api'
import messages from '../messages'
import { messages as stopMessages } from '../../stops/messages'
import apiUrl from '../../apiConfig'

import AuthenticatedRoute from '../../auth/components/AuthenticatedRoute'
import MyMap from '../../maps/components/MyMap'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import PlaceIcon from '@material-ui/icons/Place'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'



class Trip extends Component {
  constructor (props) {
    super(props)

    this.state = {}

    // This binding is necessary to make `this` work in the callback
    this.onDeleteTrip = this.onDeleteTrip.bind(this)
    this.onGetTrip = this.onGetTrip.bind(this)

    // get trip id which is used by most of the methods in this class
    this.id = this.props.match.params.id

  }

  onGetTrip() {
    const { flash, user, setTrip } = this.props

    getTrip(this.id, user)
      .then(handleErrors)
      .then(response => response.json())
      .then((jsonResponse) => setTrip(jsonResponse.trip))
      .catch(() => flash(messages.getTripsFailure, 'flash-error'))
  }

  async componentDidMount() {
    const { flash, history, user, setStops } = this.props

    await this.onGetTrip()
    getStops(this.id, user)
      .then(handleErrors)
      .then(response => response.json())
      .then((jsonResponse) => setStops(jsonResponse.stops))
      .catch(() => flash(messages.getStopsFailure, 'flash-error'))
  }

  onDeleteTrip(event) {
    const { flash, history, user } = this.props

    deleteTrip(this.id, user)
      .then(handleErrors)
      .then(() => history.push('/trips'))
      .catch(() => flash(messages.getTripsFailure, 'flash-error'))
  }

  render () {
    const { flash, user, trip, stops } = this.props



    let stopList = null
    if (stops.length) {

      stopList = stops.map(stop=>{
        const { location, date, id } = stop

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="stop">
                    <PlaceIcon/>
                  </Avatar>
                }
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  <Link to={`/trips/${this.id}/stops/${id}`}>{location}</Link>
                </Typography>
                <Typography color="textSecondary">
                  {date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        )
      })

    }

    const container = {
      padding: 24
    }

    const root = {
      flexGrow: 1,
    }
    const grow = {
      flexGrow: 1,
    }
    const menuButton = {
      marginLeft: -12,
      marginRight: 20,
    }


    return(


      <React.Fragment>
        <div>
          <AppBar position="static" color="default">
            <Toolbar>

              <Typography style={grow} variant="h6" color="inherit">
                {trip && trip.name}
              </Typography>

              <Link style={menuButton} exact to={ `/trips/${this.id}/rename` }>
                <Button color="inherit">Rename Trip</Button>
              </Link>

              <IconButton style={menuButton} aria-haspopup="true" onClick={this.onDeleteTrip} color="inherit">
                <DeleteIcon />
              </IconButton>

              { stopList && <Link style={menuButton} exact to={ `/trips/${this.id}/map` }>
                <Button variant="contained" color="secondary">Map Trip!</Button>
              </Link> }

            </Toolbar>
          </AppBar>
        </div>
        <div style={container}>
          <Grid container spacing={24}>
            {stopList}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="new stop">
                      <NotListedLocationIcon/>
                    </Avatar>
                  }
                  title="Where to next?"
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <Link exact to={ `/trips/${this.id}/add-stop` }>add stop</Link>
                  </Typography>
                  <Typography color="textSecondary">
                    build out your trip!
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

export default withRouter(Trip)
