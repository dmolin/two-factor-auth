import React from 'react'
import { Link } from 'react-router'
import { Field } from 'redux-form'
import FormInput from './FormInput'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.handleRegistration = this.handleRegistration.bind(this)
  }

  handleRegistration(event) {
    console.log("registering user")
    const { email, password, name } = this.props.formValues
    this.props.signup(email, password, { name } )
  }

  render() {
    const { handleSubmit, pristine, invalid, submitting } = this.props
    const disabled = pristine || submitting || invalid

    let buttonState = disabled ? {disabled:'disabled'} : {}

    return (
      <div>
        <div className="container container--unpadded">
          <section className="section central-box cf">
            <h1 className="section-header">Register a new Account</h1>

            <form className="pure-form pure-form-stacked form form--wide" onSubmit={handleSubmit(this.handleRegistration)}>
              <div className="form-field">
                <Field label="Fullname" placeholder="enter your full name" name="name" component={FormInput} type="text" />
              </div>

              <div className="form-field">
                <Field label="Email" placeholder="enter your email" name="email" component={FormInput} type="text" />
              </div>

              <div className="form-field">
                <Field label="Password" name="password" placeholder="enter your password" component={FormInput} type="password" />
              </div>

              <div className="form-field">
                <Field label="Confirm Password" name="password_confirm" placeholder="retype your password" component={FormInput} type="password" />
              </div>

              <div className="pull-right">
                <button className="pure-button button-success button-primary" type="submit" {...buttonState}>Register</button>
              </div>
            </form>
          </section>

          <section className="section central-box cf">
            <h1 className="section-header">Already registered?</h1>

            <div className="pure-form form-wide">
              <Link to='/login' className="pure-button button-success button-primary liquid">Login here</Link>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default Register
