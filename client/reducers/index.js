import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import { reducer as form } from 'redux-form'

export default combineReducers({
  auth,
  form,
  routing: routerReducer
})
