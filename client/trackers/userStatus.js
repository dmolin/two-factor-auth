import {getStore} from '../store'
import {browserHistory} from 'react-router'
import loginAuth from '../actions/loginAuth'
import loggedIn from '../actions/loggedIn'

Meteor.startup(() => {
  
  // Login flow tracker
  /*
  Tracker.autorun(() => {
    const store = getStore()
    let shouldRedirect = false

    if(Meteor.user() && !store.getState().auth.state  !== 'LOGGED_IN') {
      console.log("logged in (detected)", store.getState())
      //if we're in the login state, change url to the main dashboard page
      const state = store.getState().auth.state 
      const alreadyValidated = Meteor.user().profile.registrationStatus == 'validated'

      if ((state === 'LOGGING_IN' || state === 'SIGNING_UP') && alreadyValidated) {
        console.log("redirect the user to homepage")
        shouldRedirect = true;
      }
      store.dispatch(loggedIn(Meteor.user()))
      
      if (shouldRedirect) {
        browserHistory.push('/')
      }
    }
  })
  */

  Tracker.autorun(() => {
    if (!Meteor.user()) {
      return
    }

    const store = getStore()
    const alreadyValidated = Meteor.user().profile.registrationStatus == 'validated'

    if(Meteor.user() && store.getState().auth.state !== 'LOGGED_IN' && alreadyValidated) {
      store.dispatch(loggedIn(Meteor.user()))
      browserHistory.push('/home')
    }
  })

  // Registration process tracker
  Tracker.autorun(() => {
    if (!Meteor.user()) return;

    const store = getStore()
    const isLoggedIn = store.getState().auth.state === 'LOGGED_IN'
    //const alreadyValidated = Meteor.user().profile.registrationStatus == 'validated'
    //const isAuthorizing = store.getState().auth.state === 'LOGGING_AUTH'

    if(Meteor.user().profile.registrationStatus !== 'validated') {
      browserHistory.push('/complete-registration')
    } 

  })
})

