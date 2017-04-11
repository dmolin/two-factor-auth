Two-factor-auth
================================================================================

Simple Meteor App skeleton with sign-up / sign-in and 2 factor auth (via Authy)

The App is live [here](http://tfa.davidemolin.com)

You can also see a video demonstrating the proof-of-concept [here](https://vimeo.com/189141783)

[![Video Screenshot](/README/authy.png?raw=true)](https://vimeo.com/189141783)


### Tech Stack ###

- Meteor 1.4.2
- React
- Redux + Redux Saga (async/await)
- ES6
- Twilio Authy

### Run the app

just do an `npm i`
followed by `meteor run --settings config/development/settings.json`

You need to tweak settings.json using a real Authy api key

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

