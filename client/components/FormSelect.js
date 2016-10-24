import React from 'react'

const FormSelect = (props) => {
  const { input, label, type, id, placeholder, className, params, meta: { touched, error, warning }} = props
  const classes = `form-input ${className}`

  function onBlur(ev) {
    console.log("onblur", ev)
    input.onBlur()
  }

  return (
    <div className={classes}>
      <label htmlFor={id} className="form-label">{label}</label>
      <select id={id} {...input} {...params} type={type} onBlur={onBlur}></select>
      {touched && ((error && <span className="validation-error">{error}</span>) || (warning && <span className="validation-warning">{warning}</span>))}
    </div>
  )
}

export default FormSelect
