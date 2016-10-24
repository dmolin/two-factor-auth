export const ACTION_SIGNUP = 'SIGNUP'

export default function signup(email, password, profile) {
  return {
    type: ACTION_SIGNUP,
    email,
    password,
    profile
  }
}
