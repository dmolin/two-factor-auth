export const ACTION_VALIDATE = 'VALIDATE'

export default function validate(authyId, token) {
  return {
    type: ACTION_VALIDATE,
    authyId,
    token
  }
}
