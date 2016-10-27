const authy = require('authy')(Meteor.settings.private.authy.apiKey, Meteor.settings.private.authy.apiUrl)

const authyRegisterUser = Meteor.wrapAsync(authy.register_user, authy)
const authyRequestSMS = Meteor.wrapAsync(authy.request_sms, authy)
const authyVerifyToken = Meteor.wrapAsync(authy.verify, authy)

Accounts.registerLoginHandler((loginRequest) => {
  if (!loginRequest.withToken) {
    return undefined
  }

  const user = Accounts.findUserByEmail(loginRequest.email)
  const result = Accounts._checkPassword(user, loginRequest.pwd)

  if( !user || result.error) {
    console.log("pwd from client", loginRequest.pwd)
    console.log("USER Authorization failed", result)
    return result
  }

  // check token with Authy
  // if we're still registering the token can be null
  if (user.profile.registrationStatus !== 'validated') {
    console.log("Login partially completed. user still needs to pass authy challenge")
    // request SMS for completing the registration flow
    authyRequestSMS(user.profile.authyId)
    return result;
  }

  try {
    console.log("verify", user.profile.authyId, loginRequest.token)

    const response = authyVerifyToken(user.profile.authyId, loginRequest.token)
    if (!response || response.success !== "true") {
      console.log("TOKEN Authorization failed", response)
      //throw new Meteor.Error("unauthorized", "Login unsuccessful. Try again")
      result.error = new Meteor.Error(403, "Login unsuccessful. Try again")
      return result
    }
  } catch (error) {
    console.log("Exception calling Authy", error)
    result.error = new Meteor.Error(403, "Login unsuccessful. Try again")
  }

  console.log("Login completed.")
  return result
})
