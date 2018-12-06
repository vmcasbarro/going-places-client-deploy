import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'

import messages from '../messages'
import apiUrl from '../../apiConfig'

// npm module for sanitizing user imput
import DOMPurify from 'dompurify'

// node module for converting image to base64 string
import FileBase64 from 'react-file-base64'

import { handleErrors, getText } from '../api'

// translation imports
import { googleMapsApiKey } from '../../.env.js'
const googleTranslate = require('google-translate')(googleMapsApiKey)

// material UI imports
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

class VisionTranslate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newFile: {},
      brandNewFile: {},
      visionResponse: {
        description: ''
      },
      descriptionTranslated: ''

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
      .then(() => this.translate())
      .catch(() => flash(messages.getTextFailure, 'flash-error'))
  }

  translate() {
    const { description } = this.state.visionResponse
    const { descriptionTranslated } = this.state

    // promisify googleTranslate API call
    const transPromise = function (text, language) {
      return new Promise((resolve, reject) => {
        googleTranslate.translate(text, language, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    }

    transPromise(description, 'en')
      .then((data) => {this.addTranslation(data.translatedText)})
      .catch(console.error)
  }

  addTranslation = translatedText => {
    this.setState({ descriptionTranslated: translatedText })
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
    const { descriptionTranslated } = this.state
    const { base64 } = this.state.newFile

    const content = {
      // height: '300px'
    }

    const paddingBottom = {
      'padding-bottom': '20px'
    }

    const marginBottom = {
      'margin-bottom': '20px'
    }

    return(
      <React.Fragment>
        <Typography color="textSecondary">
          or detect text from an image
        </Typography>

        <Typography variant="h5" component="h2">

          <FileBase64
            multiple={ false }
            onDone={ this.getFile.bind(this) }
            style={paddingBottom}
          />
          <div style={paddingBottom}>
            { base64 && <img src={base64} className="img-thumbnail" alt="image preview" /> }
          </div>
          { base64 && <Button style={marginBottom} variant="contained" color="primary" type="submit" primary={true} onClick={this.onGetText}>
            detect text and translate
          </Button> }
          <div style={content}>
            {description && <span> <code>detected text:</code> </span> }
            {DOMPurify.sanitize(description)}
          </div>
          <br/>
          <div style={content}>
            {description && <span> <code>translated text:</code> </span> }
            {DOMPurify.sanitize(descriptionTranslated)}
          </div>
        </Typography>

      </React.Fragment>
    )
  }
}

export default withRouter(VisionTranslate)
