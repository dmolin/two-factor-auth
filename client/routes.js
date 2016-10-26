import MainLayout from './components/MainLayout'
import Home from './containers/Home'
import authCheck from './middlewares/requireAuth'
import Login from './containers/Login'
import Register from './containers/Register'
import NotFound from './components/NotFound'
import CompleteRegistration from './containers/CompleteRegistration'

function _augment(configArray) {
  function addOnEnter(entry) {
    return Object.assign({ onEnter: authCheck.bind(entry.onEnter) }, entry);
  }
  function addAuthCheck(entry) {
    if (entry.childRoutes && entry.childRoutes.length) {
      entry.childRoutes = entry.childRoutes.map(addAuthCheck)
    }
    return addOnEnter(entry);
  }
  return configArray.map(addAuthCheck);
}

function redirect (from, to) {
  return {
    path: from,
    onEnter: (nextState, transition) => {
      console.log("redirecting to ", to)
      transition(to)
    }
  }
}

function redirectedRoutes() {
  return [
    redirect("/", "/home")
  ]
}

function publicRoutes() {
  return [{
    path: '/login',
    component: Login
  }, {
    path: '/register',
    component: Register
  }, {
    path: '/complete-registration',
    component: CompleteRegistration
  }]
}

function appRoutes() {
  return [{
    path: '/home',
    component: MainLayout,
    indexRoute: {
      component: Home
    },
    childRoutes: []
  }]
}

function unknownRoutes() {
  return [{
    path:'*', component: NotFound
  }]
}

export const routes = [].concat(
    publicRoutes(),
    _augment(appRoutes()),
    redirectedRoutes(),
    unknownRoutes()
)
