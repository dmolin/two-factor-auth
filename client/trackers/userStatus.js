import {getStore} from '../store'
import {browserHistory} from 'react-router'
import loggedIn from '../actions/loggedIn'

Meteor.startup(() => {
 
  // Track realtime login status changes 
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

  // Track Registration process 
  Tracker.autorun(() => {
    if (!Meteor.user()) return;

    if(Meteor.user().profile.registrationStatus !== 'validated') {
      browserHistory.push('/complete-registration')
    } 

  })
})

