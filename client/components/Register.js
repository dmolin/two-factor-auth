import React from 'react'
import { Link } from 'react-router'
import { Field } from 'redux-form'
import FormInput from './FormInput'
import FormSelect from './FormSelect'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.handleRegistration = this.handleRegistration.bind(this)
  }

  handleRegistration(event) {
    console.log("registering user")
    const { email, password, name, phoneno } = this.props.formValues

    //so far, we've to get the countrycode from the DOM, since it's not yet reflected in the Redux state tree
    const countrycode = $('#countries-input-0').val()
    this.props.signup(email, password, { name, phoneno, countrycode } )
  }

	componentDidUpdate() {
		// super hacky, but it seems to be the only way to make Authy fields work in a
		// dynamic DOM environment
		setTimeout(() => {
			if ($('#countries-input-0').length === 0) {
				Authy.UI.instance().init()
			}
		}, 100)
	}

  render() {
    const { handleSubmit, pristine, invalid, submitting } = this.props
    const disabled = pristine || submitting || invalid

    let buttonState = disabled ? {disabled:'disabled'} : {}
    const countryparams = {'data-show-as':'number'}

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
                <div className="pure-g">
                  <Field name="countrycode" label="Country" id="authy-countries" className="pure-u-5-24" component={FormSelect} params={countryparams} type="select"/>
                  <div className="pure-u-19-24 register-phone-wrapper">
                    <Field label="Phone number" placeholder="your number" name="phoneno" component={FormInput} type="text" className="pure-u-22-24 register-phone" />
                  </div>
                </div>
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
