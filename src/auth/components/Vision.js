import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import TranslateIcon from '@material-ui/icons/Translate'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import VisionTranslate from '../../stops/components/VisionTranslate'



import './Home.scss'


class Vision extends Component {
  constructor () {
    super()

    this.state = {
    }
  }

  render () {
    const { flash } = this.props

    const container = {
      // 'margin-top': '100px'
    }

    const paddingBottom = {
      'padding-bottom': '20px'
    }

    return (
      <div className="home-background">
        <Grid container justify="center" spacing={24}>
          <Grid item sm={12} md={6} >
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="translate">
                    <TranslateIcon/>
                  </Avatar>
                }
                title="translation"
              />
              <CardContent>


                <VisionTranslate
                  flash={this.newFlash}
                />

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withRouter(Vision)
