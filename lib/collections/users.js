import {Mongo} from 'meteor/mongo'
import Schemas from '../schemas'

/*
 * Meteor already provides a "user" collection, containing:
 *   emails: [] : array of emails associated to this user
 *   services: {} server-only object containing the encrypted password
 */

Schemas.UserProfile = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  phoneno: {
    type: String
  },
  countrycode: {
    type: String
  },
  authyId: {
    type: String
  },
  registrationStatus: {
    type: String,
    allowedValues: ['created', 'registered', 'validated'],
  }
})

Schemas.User = new SimpleSchema({
  emails: {
    type: [
      new SimpleSchema({
        address: Schemas.Mixins.email,
        verified: {
          type: Boolean,
          defaultValue: false
        }
      })
    ]
  },

  profile: {
    type: Schemas.UserProfile
  },

  services: {
    type: Object,
    optional: true,
    blackbox: true
  },

  status: {
    type: Object,
    optional: true,
    blackbox: true
  },

  resume: {
    type: Object,
    optional: true,
    blackbox: true
  }
})

Meteor.users.attachSchema(Schemas.User);
Meteor.users.attachBehaviour('timestampable');

  Meteor.users.deny({
    update: function() {
      return true;
    }
  });

export default Meteor.users
