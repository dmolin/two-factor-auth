import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { reduxForm } from 'redux-form'
import Login from '../components/Login'
import login from '../actions/login'
import validations,{ required } from '../../lib/utils/validations'

function mapStateToProps(state) {
  return {
    loginState: state.auth.state,
    formValues: (state.form && state.form.LoginForm && state.form.LoginForm.values) || {}
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login: login
  }, dispatch)
}

//export default connect(mapStateToProps, mapDispatchToProps)(Login)
function validate(values) {
  const errors = {}

  errors.email = required(values.email) || validations.isEmail(values.email)
  //when logging in, no password checking is done except for presence, since we don't want to give up any
  //information that might help hackers to guess a password
  errors.password = required(values.password)
  //token can be null. this can be the case when coming back to complete the 2-step registration process
  //errors.token = required(values.token)
  return errors
}

const reduxFormConfig = {
  form: 'LoginForm',
  fields: ['email', 'password', 'token'],
  validate,
  syncBlurFields: ['email','password', 'token']
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(Login))
