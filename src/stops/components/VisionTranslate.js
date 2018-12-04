import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'

import messages from '../messages'
import apiUrl from '../../apiConfig'

// google maps key and wrapper
import { googleMapsApiKey } from '../../.env.js'
const loadGoogleMapsApi = require('load-google-maps-api')

// node module for converting image to base64 string
import FileBase64 from 'react-file-base64'

import { handleErrors, getText } from '../api'

class VisionTranslate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newFile: {}
    }

    // This binding is necessary to make `this` work in the callback
    this.onGetText = this.onGetText.bind(this)

  }

  onGetText(event) {
    const { flash } = this.props
    const { base64 } = this.state.newFile
    console.log(base64, googleMapsApiKey)
    event.preventDefault()
    console.log('clicked!')
    getText(base64, googleMapsApiKey)
      .then(console.log)
      .then(handleErrors)
      .then(() => flash(messages.createStopSuccess, 'flash-success'))
      .then(() => {this.redirect()})
      .catch(() => flash(messages.getTextFailure, 'flash-error'))
  }

  // Callback~
  getFile(file){
    this.setState({ newFile: file })
  }

  componentDidMount() {

  }

  render () {

    return(
      <React.Fragment>

        <h1>Hello World</h1>
        <FileBase64
          multiple={ false }
          onDone={ this.getFile.bind(this) } />
        <button type="submit" onClick={this.onGetText}>get text</button>



      </React.Fragment>
    )
  }
}

export default withRouter(VisionTranslate)
