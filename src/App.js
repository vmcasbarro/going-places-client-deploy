import React, { Component } from 'react'
import './App.scss'
import { Route, Link, Switch } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

// FEATURE IMPORTS
import Trips from './trips/components/Trips'
import NewTrip from './trips/components/NewTrip'
import Trip from './trips/components/Trip'
import RenameTrip from './trips/components/RenameTrip'
import NewStop from './stops/components/NewStop'
import MyMap from './maps/components/MyMap'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null,
      trips: [],
      trip: {},
      stops: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  setTrips = trips => this.setState({ trips })

  setTrip = trip => this.setState({ trip })

  setStops = stops => this.setState({ stops })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  render () {
    const { flashMessage, flashType, user, trips, trip, stops } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <main className="container">

          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />

          {
            // TRIP ROUTES
          }
          <Switch>
            <AuthenticatedRoute user={user} exact path='/trips/new-trip' render={() => (
              <NewTrip flash={this.flash} user={user} />
            )} />
            <AuthenticatedRoute user={user} exact path='/trips' render={() => (
              <Trips flash={this.flash} user={user} setTrips={this.setTrips} trips={trips} />
            )} />
            <AuthenticatedRoute user={user} exact path='/trips/:id' render={() => (
              <Trip
                flash={this.flash}
                user={user}
                setTrip={this.setTrip}
                setStops={this.setStops}
                trip={trip}
                stops={stops}
              />
            )} />
            <AuthenticatedRoute user={user} exact path='/trips/:id/rename' render={() => (
              <RenameTrip flash={this.flash} user={user} />
            )} />

            <AuthenticatedRoute user={user} exact path='/trips/:id/map' render={() => (
              <MyMap
                flash={this.flash}
                user={user}
                trip={trip}
                stops={stops}
              />
            )} />

          </Switch>

          {
            // STOP ROUTES
          }

          <AuthenticatedRoute user={user} exact path='/trips/:id/add-stop' render={() => (
            <NewStop flash={this.flash} user={user} />
          )} />



        </main>
      </React.Fragment>
    )
  }
}

export default App
