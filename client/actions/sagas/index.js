import loginWatcher from './login_saga'
import logoutWatcher from './logout_saga'
import signupWatcher from './signup_saga'
import validateWatcher from './validate_saga'

export default function* rootSaga() {
  yield [
    loginWatcher(),
    logoutWatcher(),
    signupWatcher(),
    validateWatcher()
  ]
}
