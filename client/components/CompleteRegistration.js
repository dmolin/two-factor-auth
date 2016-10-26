import React from 'react'
import FormInput from './FormInput'
import {Field} from 'redux-form'
import LoginStates from '../constants/LoginStates'

class CompleteRegistration extends React.Component {
  constructor(...args) {
    super(...args)
    this.handleVerify = this.handleVerify.bind(this)
  }

  handleVerify(values) {
    this.props.validateToken(Meteor.user().profile.authyId, values.token)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <section className="home central-box cf">
      <div className='verify-account'>
        <p>You should have received a code through SMS</p>
        <p>Please verify your account by entering the security code</p>

        <form className="pure-form pure-form-stacked form form--wide" onSubmit={handleSubmit(this.handleVerify)}>
          <div className="form-field">
            <Field label="SMS Code" placeholder="enter the code you received" name="token" component={FormInput} type="text" />
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

export default CompleteRegistration
