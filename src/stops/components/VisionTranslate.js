import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'

import messages from '../messages'
import apiUrl from '../../apiConfig'

// google maps key and wrapper
import { googleMapsApiKey } from '../../.env.js'
const loadGoogleMapsApi = require('load-google-maps-api')

import DOMPurify from 'dompurify'

// node module for converting image to base64 string
import FileBase64 from 'react-file-base64'

import { handleErrors, getText } from '../api'

class VisionTranslate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newFile: {},
      brandNewFile: {},
      visionResponse: {
        description: ''
      }

    }

    // This binding is necessary to make `this` work in the callback
    this.onGetText = this.onGetText.bind(this)
    this.removeBase64Prefix = this.removeBase64Prefix.bind(this)

  }

  removeBase64Prefix(){
    // destructure the state to get the base64 string (with prefix)
    const { base64 } = this.state.newFile
    console.log(base64)
    // find the index of ',', which is the end of the prefix
    const startingPoint = (base64.indexOf(',')) + 1
    const trimmedBase64 = base64.slice(startingPoint)
    console.log(trimmedBase64)
    const trimmedNewFile = { ...this.state.newFile, base64: trimmedBase64 }
    this.setState({ brandNewFile: trimmedNewFile})
  }

  onGetText(event) {
    const { flash } = this.props
    const { base64 } = this.state.brandNewFile
    console.log(base64, googleMapsApiKey)
    event.preventDefault()
    console.log('clicked!')
    getText(base64, googleMapsApiKey)
      .then((response) => response.json())
      .then((jsonResponse) => {
        this.setState({ visionResponse: jsonResponse.responses[0].textAnnotations[0]
        })
      })
      .catch(() => flash(messages.getTextFailure, 'flash-error'))
  }

  // Callback
  getFile(file){
    this.setState({ newFile: file })
    this.removeBase64Prefix()
  }

  componentDidMount() {

  }

  render () {
    const { description } = this.state.visionResponse
    const { base64 } = this.state.newFile

    const content = {
      // height: '300px'
    }

    const thumbnailSize = {
      height: '200px'
    }

    return(
      <React.Fragment>

        <FileBase64
          multiple={ false }
          onDone={ this.getFile.bind(this) } />
        <button type="submit" onClick={this.onGetText}>get text</button>
        <div style={content}>{DOMPurify.sanitize(description)}</div>
        <div style={thumbnailSize}>
          { base64 && <img src={base64} className="img-thumbnail" alt="image preview" /> }
        </div>


      </React.Fragment>
    )
  }
}

export default withRouter(VisionTranslate)
