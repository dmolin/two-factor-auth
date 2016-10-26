import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import LoginTokenValidation from '../components/LoginTokenValidation'
import { reduxForm } from 'redux-form'
import validateToken from '../actions/validate'
import validations,{ required } from '../../lib/utils/validations'

function mapStateToProps(state) {
  return {
    loginState: state.auth.state,
    user: state.auth.data
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    validateToken
  }, dispatch)
}

function validate(values) {
  const errors = {}

  errors.token = required(values.token)
  return errors;
}

const reduxFormConfig = {
  form: 'VerifyForm',
  fields: ['token'],
  validate,
  syncBlurFields: ['token']
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(LoginTokenValidation))
