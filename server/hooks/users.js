// HOOKS
const authy = require('authy')(Meteor.settings.private.authy.apiKey, Meteor.settings.private.authy.apiUrl)
const authyRegisterUser = Meteor.wrapAsync(authy.register_user, authy)
const authyRequestSMS = Meteor.wrapAsync(authy.request_sms, authy)

Accounts.onCreateUser((option, user) => {
  console.log(option)
  console.log(user)

  Object.assign(user, {profile: option.profile})

  // register on Authy
  try {
    //create new user profile on Authy
    const registrationResult = authyRegisterUser(user.emails[0].address, user.profile.phoneno, user.profile.countrycode)
    console.log("registration outcome", registrationResult)
    const authyId = registrationResult.user.id
   
    //update meteor user account
    Object.assign(user, {profile: Object.assign({}, option.profile,  {authyId: authyId, registrationStatus: 'registered' })}) 

    //send SMS
    authyRequestSMS(authyId)
    console.log("SMS sent")
    return user

  } catch (error) {
    console.log(error)
    throw new Meteor.Error("createuser", "Please try again later", error)
  }
})
