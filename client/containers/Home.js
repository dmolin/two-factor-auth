import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Home from '../components/Home'
import { reduxForm } from 'redux-form'


function mapStateToProps(state) {
  return {
    user: state.auth.data
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

function validate(values) {
  const errors = {}

  return errors;
}

const reduxFormConfig = {
  form: 'VerifyForm',
  fields: ['smscode'],
  validate,
  syncBlurFields: ['smscode']
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(Home))
