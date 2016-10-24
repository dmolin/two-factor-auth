import MainLayout from './components/MainLayout'
import Home from './containers/Home'
import authCheck from './middlewares/requireAuth'
import Login from './containers/Login'
import Register from './containers/Register'
import NotFound from './components/NotFound'

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
      transition(to)
    }
  }
}

function genericRules() {
  return [
    redirect("/", "/home")
  ]
}

function appRoutes() {
  return [{
    path: '/home',
    component: MainLayout,
    indexRoute: {
      component: Home
    },
    childRoutes: []
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/register',
    component: Register
  }, {
    path:'*', component: NotFound
  }]
}

export const routes = [].concat(
    genericRules(), 
    _augment(appRoutes())
)
