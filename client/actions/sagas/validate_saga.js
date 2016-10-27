import {takeEvery} from 'redux-saga'
import {put, call} from 'redux-saga/effects'
import denodeify from '../../../lib/utils/denodeify'
import {getStore} from '../../store'
import {browserHistory} from 'react-router'
import {ACTION_VALIDATE} from '../validate'
import loggedIn from '../loggedIn'

export default function* signupWatcher() {
  yield* takeEvery(ACTION_VALIDATE, function* (action){
    console.log("validating user ", action);
    try {
      const result = yield call(denodeify(Meteor.call), 'verifyToken', action.authyId, action.token)
      yield put(loggedIn(Meteor.user()))
      browserHistory.push('/home')
    } catch(error) {
      console.log(error)
      swal('verification failed', error.reason || "please check your token and try again", "error")
    }
  })
}
