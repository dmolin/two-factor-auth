import {takeEvery} from 'redux-saga'
import {put, call} from 'redux-saga/effects'
import denodeify from '../../../lib/utils/denodeify'
import {getStore} from '../../store'
import {browserHistory} from 'react-router'
import {ACTION_SIGNUP} from '../signup'

export default function* signupWatcher() {
  yield* takeEvery(ACTION_SIGNUP, function* (action){
    try {
      yield call(denodeify(Accounts.createUser), {
          email:action.email, 
          password:action.password,
          profile: action.profile
      })
      Meteor.logoutOtherClients()
    } catch(error) {
      console.log(error)
      swal('signup failed', error.reason || "please check your data and try again", "error")
    }
  })
}

