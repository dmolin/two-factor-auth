import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Register from '../components/Register'
import signup from '../actions/signup'
import { reduxForm } from 'redux-form'
import validations, { required } from '../../lib/utils/validations'

function mapStateToProps(state) {
  return {
    formValues: (state.form.RegisterForm && state.form.RegisterForm.values) || {}
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signup: signup
  }, dispatch)
}

function validate(values) {
  const errors = {}

  errors.name = required(values.name)
  errors.email = required(values.email) || validations.isEmail(values.email)
  errors.password = required(values.password) || validations.isPassword(values.password)
  errors.password_confirm = required(values.password_confirm) || validations.isMatchingPassword(values.password_confirm, values.password)
  errors.phoneno = required(values.phoneno) || validations.isMobileNumber(values.phoneno)
  return errors
}

const reduxFormConfig = {
  form: 'RegisterForm',
  fields: ['name', 'email','password', 'password_confirm', 'countrycode', 'phoneno' ],
  validate,
  syncBlurFields: ['name', 'email','password', 'password_confirm', 'countrycode', 'phoneno' ]
}

const connectedForm = reduxForm(reduxFormConfig)(Register)

export default connect(mapStateToProps, mapDispatchToProps)(connectedForm)
