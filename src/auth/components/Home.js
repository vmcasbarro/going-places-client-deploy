import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

import Typography from '@material-ui/core/Typography'


import './Home.scss'


class SignIn extends Component {
  constructor () {
    super()

    this.state = {
    }
  }

  render () {
    const { flash } = this.props

    return (
      <div className='row justify-content-center home-background'>
        <div className='col-12 col-md-6 col-xl-6 mt-5'>
          <Typography variant="h5" component="h2">
            Le vent se lève! <br/>. . . il faut tenter de vivre !
          </Typography>
          <Typography color="textSecondary">
            Paul Valéry, Le cimetière marin
          </Typography>

        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
