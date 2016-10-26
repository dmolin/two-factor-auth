Two-factor-auth
================================================================================

Simple Meteor App template with sign-up / sign-in and 2 factor auth (via Authy)

### Tech Stack ###

- Meteor 1.4.2
- React
- Twilio Authy

### Flow ###

2 Step Authentication has been achieved by tweaking the login flow present in Meteor, in order to get an atomic operation resulting from both the validation of the user account in Mongo AND the validation of the token via Authy.
Being an all-or-none operation, there are no Meteor user tokens dropped on local storage unless both validation succeed. This makes it easier to track when the user is logged in via Tracker (see client/trackers/userStatus.js )


### Screenshots ###

Login screen

![Login](/README/login.png?raw=true)

Logged-in screen (home page)

![LoggedIn](/README/logged-in.png?raw=true)

Registration screen: first step

![Reg1](/README/register-1.png?raw=true)

Registration screen: 2-step auth

![Reg2](/README/register-2.png?raw=true)

