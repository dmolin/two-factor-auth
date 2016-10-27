import {ACTION_LOGIN} from '../actions/login'
import {ACTION_LOGGED_IN} from '../actions/loggedIn'
import {ACTION_LOGGED_OUT} from '../actions/loggedOut'
import {ACTION_SIGNUP} from '../actions/signup'
import LoginStates from '../constants/LoginStates'

export const initialState = {
  state: LoginStates.LOGGED_OUT,
  data: null
}

export default function(state = initialState, action) {
  const {type} = action

  switch(type) {
    case ACTION_LOGIN: 
      return Object.assign({}, state, {state: LoginStates.LOGGING_IN})
    case ACTION_LOGGED_IN:
      return Object.assign({}, state, {state: LoginStates.LOGGED_IN, data: action.data })
    case ACTION_LOGGED_OUT:
      return Object.assign({}, state, {state: LoginStates.LOGGED_OUT, data: null })
    case ACTION_SIGNUP:
      return Object.assign({}, state, {state: LoginStates.SIGNING_UP, data: action.data})
    default:
      return state
  }
}
