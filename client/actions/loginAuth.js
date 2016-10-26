export const ACTION_LOGIN_AUTH = 'LOGIN_AUTH'

export default function loginAuth(authyId) {
  return {
    type: ACTION_LOGIN_AUTH,
    authyId
  }
}
