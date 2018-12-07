import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

import './SignIn.scss'


class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  signIn = event => {
    event.preventDefault()

    const { email, password } = this.state
    const { flash, history, setUser } = this.props

    signIn(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => flash(messages.signInSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signInFailure, 'flash-error'))
  }

  render () {
    const { email, password } = this.state

    // const mainDiv = {
    //   position:'absolute',
    //   top:0,
    //   bottom:0,
    //   left:0,
    //   right:0,
    //   overflow:'hidden',
    //   'z-index':-1,
    //   'background-color': 'red'
    // }

    return (
      <div className='row justify-content-center sign-in-background'>
        <div className='col-12 col-md-4 col-xl-3 mt-5'>
          <form className='auth-form' onSubmit={this.signIn}>
            <h3>Sign In</h3>
            <label htmlFor="email">Email</label>
            <input
              required
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
              required
              name="password"
              value={password}
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
