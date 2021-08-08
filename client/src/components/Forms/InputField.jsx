import React, { useState } from "react";

const InputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  max,
  shrinkLabel = true,
  classes,
  cols,
  errors,
  handleChange,
  handleBlur,
}) => {
  const [inputFocused, setInputFocused] = useState(false);
  return (
    <div className={`input-field ${cols}`} id={name}>
      <div controlid={name} className={`form-group flex-grow-1  ${shrinkLabel ? "parent-for-input-shrink" : ""}`}>
        <label className={`form-label ${shrinkLabel ? (inputFocused || value?.length) && "shrink" : classes}`}>
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          min="0"
          max={max}
          className='form-control'
          onChange={handleChange}
          onBlur={(e) => {
            handleBlur && handleBlur(e);
            setInputFocused(false);
          }}
          onFocus={() => setInputFocused(true)}
        />

        {errors && <small className={`text-danger ml-1 ${errors ? "appear" : ""}`}>{errors}</small>}
      </div>
    </div>
  );
};

export default InputField;
