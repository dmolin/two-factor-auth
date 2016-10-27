import {takeEvery} from 'redux-saga'
import {put, call} from 'redux-saga/effects'
import {getStore} from '../../store'
import {browserHistory} from 'react-router'

import {ACTION_LOGIN} from '../login'
import loggedOut from '../loggedOut'
import denodeify from '../../../lib/utils/denodeify'

export default function* loginWatcher() {
  //for every login action, "take" its data (the entire actin) and pass it to the login saga
  yield* takeEvery(ACTION_LOGIN, function* (action){
    const username = action.email,
          password = action.password,
          token = action.token

    try {
      yield call(denodeify(Meteor.loginWithToken), username, password, token)
      Meteor.logoutOtherClients()
    } catch(error) {
      /*
       * this must be changed for a purer approach: just dispatch the POPUP_MESSAGE_SHOW event with
       * msgType: 'error',
       * msg: error.message
       * the appropriate reducer will store this in the popup message area of the store and as a consequence a popup
       * will be triggered in the master layout (and will dispatch a POPUP_MESSAGE_CLEAR event)
       */
      swal("login failed", "please check your username/password/auth code", "error")
      yield put(loggedOut())
    }
  })
}
