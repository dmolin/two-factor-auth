import React from 'react'
import FormInput from './FormInput'
import {Field} from 'redux-form'
import {browserHistory} from 'react-router'

class LoginTokenValidation extends React.Component {
  constructor(...args) {
    super(...args)
    this.handleVerify = this.handleVerify.bind(this)
  }

  componentDidUpdate() {
    if (this.props.loginState === 'LOGGED_IN') {
      console.log("Validation completed. go to home")
      //transition to home
      browserHistory.push('/home')      
    }
  }

  handleVerify(values) {
    this.props.validateToken(Meteor.user().profile.authyId, values.token)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <section className="home central-box cf">
      <div className='verify-account'>
        <p>Please verify your identity by entering the security code</p>

        <form className="pure-form pure-form-stacked form form--wide" onSubmit={handleSubmit(this.handleVerify)}>
          <div className="form-field">
            <Field label="Authy Code" placeholder="enter the code in your Authy App" name="token" component={FormInput} type="text" />
          </div>

          <div>
            <button className="pure-button button-success button-primary" type="submit">Validate</button>
          </div>
        </form>
      </div>
      </section>
    )
  }
}

export default LoginTokenValidation
