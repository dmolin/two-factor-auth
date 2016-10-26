import React from 'react'
import {Link, browserHistory} from 'react-router'
import LoginStates from '../constants/LoginStates'
import { Field } from 'redux-form'
import FormInput from './FormInput'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(formValues) {
    const { email, password, token } = formValues

    this.props.login(email, password, token)
  }

  componentDidUpdate() {
    if (this.props.loginState === 'LOGGING_AUTH') {
      console.log("Proceeding to validation step 2")
      //transition to login step 2
      browserHistory.push('/validate-token')      
    }
  }

  render() {
    const { handleSubmit, pristine, invalid, submitting } = this.props
    const disabled = pristine || submitting || invalid

    let buttonState = this.props.loginState === LoginStates.LOGGING_IN || disabled ? {disabled:'disabled'} : {};
    let buttonClass = `pure-button button-success button-primary ${this.props.loginState === LoginStates.LOGGING_IN ? 'button-loading' : ''}`;

    return (
      <div>
        <div className="container container--unpadded">
          <section className="section central-box cf">
            <h1 className="section-header">Login into your account</h1>

            <form className="pure-form pure-form-stacked form form--wide" onSubmit={handleSubmit(this.handleLogin)}>
              <div className="form-field">
                <Field label="Email" placeholder="enter your email" name="email" component={FormInput} type="text" />
              </div>

              <div className="form-field">
                <Field label="Password" placeholder="enter your password" name="password" component={FormInput} type="password" />
              </div>

              <div className="form-field">
                <Field label="Authy Code" placeholder="enter the code in your Authy App" name="token" component={FormInput} type="text" />
              </div>

              <div className="pull-right">
                <button type="submit" className={buttonClass} {...buttonState}>Login</button>
              </div>
            </form>
          </section>

          <section className="section central-box cf">
            <h1 className="section-header">Not yet registered?</h1>

            <div className="pure-form form-wide">
              <Link to='/register' className="pure-button button-success button-primary liquid">Signup here</Link>
            </div>
          </section>

        </div>
      </div>
    )
  }
}

export default Login
