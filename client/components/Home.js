import React from 'react'
import FormInput from './FormInput'
import { Field } from 'redux-form'

class Home extends React.Component {
  constructor(...args) {
    super(...args)

    this.handleVerify = this.handleVerify.bind(this)
  }

  handleVerify(values) {
    console.log(values)
  }

  verifyIfNotAlready(user) {
    if (user.emails[0].verified) {
      return null; //already verified
    }

    const { handleSubmit } = this.props

    //ask user to verify his/her account
    return (
      <div className='verify-account'>
        <p>Please verify your account by clicking on the following link</p>
        <button className="pure-button button-success button-primary liquid">Verify account</button>
        <p>You'll be send an authorization code via SMS that you'll have to paste in the following field</p>

        <form className="pure-form pure-form-stacked form form--wide" onSubmit={handleSubmit(this.handleVerify)}>
          <div className="form-field">
            <Field label="SMS Code" placeholder="enter the code you received" name="smscode" component={FormInput} type="text" />
          </div>
        </form>
      </div>
    )
  }

  render() {
    const { user } = this.props

    if(!user) {
      return (
        <h2>Loading...</h2>
      )
    } 

    return (
      <section className="home central-box cf">
        <p className="welcome">Hello {user.profile.name}</p>

        {this.verifyIfNotAlready(user)}
      </section>
    )
  }
}

export default Home
