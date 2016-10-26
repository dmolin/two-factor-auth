const authy = require('authy')(Meteor.settings.private.authy.apiKey, Meteor.settings.private.authy.apiUrl)

const authyRegisterUser = Meteor.wrapAsync(authy.register_user, authy)
const authyRequestSMS = Meteor.wrapAsync(authy.request_sms, authy)
const authyVerifyToken = Meteor.wrapAsync(authy.verify, authy)

Meteor.methods({
  requestSMS: function(userId) {
    console.log("request SMS", userId)

    check(userId, String)

    if (!this.userId || this.userId !== userId) {
      throw new Meteor.Error('unauthorized', "You're not authorize to invoke this method")
    }

    const user = Meteor.users.findOne(userId)

    if (!user.profile.authyId) {
      throw new Meteor.Error('unauthorized', "User is not yet authorized to request SMS service")
    }

    authyRequestSMS(user.profile.authyId)
  },

  verifyToken: function(authyId, token) {
    console.log("verify token", authyId, token)

    check(authyId, String)
    check(token, String)

    const user = Meteor.users.findOne(this.userId)

    if(user.profile.authyId !== authyId) {
      throw new Meteor.Error('unauthorized', "You're not authorized to invoke this method for a different user")
    }

    console.log("checking validity for token...")
    try {
      const response = authyVerifyToken(authyId, token)
      if (!response || response.success !== "true") {
        return false
      }

      //update the user profile
      Meteor.users.update({_id: user._id}, {$set:{"profile.registrationStatus":"validated"}})
      return true
    } catch (error) {
      console.log("Error calling authy", error)
      throw new Meteor.Error("apierror", "Token verification failed. please try again", error)
      return false
    }
  }
})
