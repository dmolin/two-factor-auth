Meteor.loginWithToken = (email, password, token, callback) => {
  let loginRequest = { 
      withToken: true, 
      email, 
      pwd: Accounts._hashPassword(password),
      token }

  //send login request
  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  })
}
