import React from 'react'

const FormInput = (props) => {
  const { input, label, type, id, placeholder, meta: { touched, error, warning }} = props
  return (
    <div className="form-input">
      <label htmlFor={id} className="form-label">{label}</label>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && ((error && <span className="validation-error">{error}</span>) || (warning && <span className="validation-warning">{warning}</span>))}
    </div>
  )
}

export default FormInput
