import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import CompleteRegistration from '../components/CompleteRegistration'
import { reduxForm } from 'redux-form'
import validateToken from '../actions/validate'

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

  return errors;
}

const reduxFormConfig = {
  form: 'VerifyForm',
  fields: ['token'],
  validate,
  syncBlurFields: ['token']
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(CompleteRegistration))
