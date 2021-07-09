import React, { useState } from "react";

import "./input-field.scss";

const InputField = ({
  label,
  name,
  type,
  placeholder,
  value = "",
  max,
  required,
  shrinkLabel = true,
  classes,
  cols,
  errors,
  handleChange,
  handleBlur,
}) => {
  const [inputFocused, setInputFocused] = useState(false);
  return (
    <div controlid={name} className={`form-group flex-grow-1  ${shrinkLabel ? "parent-for-input-shrink" : cols}`}>
      <label className={`form-label ${shrinkLabel ? (inputFocused || value.length) && "shrink" : classes}`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        min="1"
        max={max}
        required={required}
        className={`form-control`}
        onChange={handleChange}
        onBlur={(e) => {
          handleBlur && handleBlur(e);
          setInputFocused(false);
        }}
        onFocus={() => setInputFocused(true)}
      />

      {errors && <small className={`text-danger ml-1 ${errors ? "appear" : ""}`}>{errors}</small>}
    </div>
  );
};

export default InputField;
