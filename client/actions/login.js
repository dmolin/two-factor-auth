export const ACTION_LOGIN = 'LOGIN'

export default function login(email, password, token) {
  return {
    type: ACTION_LOGIN,
    email,
    password,
    token
  }
}
