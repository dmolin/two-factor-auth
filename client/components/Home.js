import React from 'react'
import FormInput from './FormInput'
import { Field } from 'redux-form'

class Home extends React.Component {
  constructor(...args) {
    super(...args)
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

      </section>
    )
  }
}

export default Home
