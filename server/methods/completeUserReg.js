const authy = require('authy')('SANDBOX_APIKEY', 'http://sandbox-api.authy.com')

Meteor.methods({
  completeUserReg: function(userId) {
    console.log("COMPLETE USER REG", userId)
    //this.unblock()
  
    if (!this.userId || this.userId !== userId) {
      throw new Meteor.Error('unauthorized', "You're not authorize to invoke this method")
    }

    check(userId, String)

    //fetch user data from Mongo
    const user = Meteor.users.findOne(userId)

    console.log(user, user.profile)

    authy.register_user(user.emails[0].address, user.profile.phoneno, user.profile.countrycode, (err, res) => {
      console.log("Authy registration completed", res.user)
      //store authy user ID
      Meteor.users.update(user._id, { $set: { 'profile.authyId': res.user.id } })
    })
  },

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

    authy.request_sms(user.profile.authyId, (err, res) => {})
  },

  verifyToken: function(userId, token) {
    console.log("verify token", userId, token)

    check(userId, String)
    check(token, String)

    if(!this.userId || this.userId !== userId) {
      throw new Meteor.Error('unauthorized', "You're not authorized to invoke this method")
    }

    const user = Meteor.users.findOne(userId)

    authy.verify(user.profile.authyId, token, (err, res) => {})
  }
})
