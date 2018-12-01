import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import {  } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }

  }



  async componentDidMount() {
  }



  render () {
    


    return(
      <React.Fragment>

        <h1>Trip Map!</h1>



      </React.Fragment>
    )
  }
}

export default withRouter(Map)
