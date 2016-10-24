export function required(val) {
  if(!val || val.trim().length === 0) {
    return "Required"
  }
}

export default {
  isEmail: (email) => {
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return 'Invalid email address'
    }
  },

  isPassword: (pwd) => {
    if(pwd && pwd.trim().length < 4) {
      return 'Please type at least 4 characters'
    }
  },

  isMatchingPassword: (pwd, otherpwd) => {
    if(pwd !== otherpwd) {
      return 'Passwords do not match'
    }
  }
}

