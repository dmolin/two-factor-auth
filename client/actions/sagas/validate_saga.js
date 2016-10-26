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
  
      /*
      // if we're here because we're logging in (step 2), then we transition to 'logged_in'
      if (['LOGGING_AUTH', 'SIGNING_UP'].indexOf(getStore().getState().auth.state) >= 0) {
        console.log("signup OR login completed and validated")
        browserHistory.push('/home')
      }
      */
      yield put(loggedIn(Meteor.user()))
      browserHistory.push('/home')
    } catch(error) {
      console.log(error)
      swal('verification failed', error.reason || "please check your token and try again", "error")
    }
  })
}
