import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, createStop } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class NewStop extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stop: {
        location: '',
        date: ''
      }
    }

    // get trip id which is used by most of the methods in this class
    this.id = this.props.match.params.id
  }

  handleChange = event => {
    const newStop = { ...this.state.stop, [event.target.name]: event.target.value }
    this.setState({ stop: newStop })
  }

  onCreateStop = event => {
    event.preventDefault()

    const { stop } = this.state
    const { flash, history, user } = this.props

    createStop(stop, this.id, user)
      .then(handleErrors)
      .then(() => flash(messages.createStopSuccess, 'flash-success'))
      .then(() => {this.redirect()})
      .catch(() => flash(messages.createStopFailure, 'flash-error'))
  }

  redirect(){
    this.props.history.push(`/trips/${this.id}`)
  }

  render () {
    const { location, date } = this.state

    return(
      <React.Fragment>

        <h1>NEW STOP</h1>


        <form className='create-stop-form' onSubmit={this.onCreateStop}>

          <br/>
          <input
            required
            name="location"
            value={location}
            type="text"
            placeholder="ex, 'London, UK'"
            onChange={this.handleChange}
          />
          <input
            required
            name="date"
            value={date}
            type="date"
            placeholder="ex, 2018-01-01"
            onChange={this.handleChange}
          />
          <button type="submit">add stop</button>
        </form>

      </React.Fragment>
    )
  }
}

export default withRouter(NewStop)
