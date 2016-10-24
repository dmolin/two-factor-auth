import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Home from '../components/Home'

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
