// import React from "react";

// import "./input-field.scss";

// const InputField = ({
//   label,
//   name,
//   value,
//   type,
//   handleChange,
//   handleBlur,
//   required,
//   errors,
//   shrinkLabel = true
// }) => {
//   return (
//     <div controlid={name} className="form-group input-shrink-animation">
//       <input
//         value={value}
//         className={`form-control`}
//         name={name}
//         type={type}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         required={required}
//       />
//       <label className={`form-label ${shrinkLabel&& value.length && "shrink"}`}>{label}</label>

//       {errors && <small className={`text-danger ml-1 ${errors ? "appear" : ""}`}>{errors}</small>}
//     </div>
//   );
// };

// export default InputField;

import React, { useState } from "react";

import "./input-field.scss";

const InputField = ({
  label,
  name,
  type,
  placeholder,
  value,
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
      <label
        className={`form-label ${
          shrinkLabel ? (inputFocused || value.length) && "shrink" : classes
        }`}
      >
        {label}
      </label>
      <input
        value={value}
        className={`form-control`}
        name={name}
        id={name}
        type={type}
        onChange={handleChange}
        onBlur={(e) => {
          handleBlur && handleBlur(e);
          setInputFocused(false);
        }}
        placeholder={placeholder}
        required={required}
        onFocus={() => setInputFocused(true)}
      />

      {errors && <small className={`text-danger ml-1 ${errors ? "appear" : ""}`}>{errors}</small>}
    </div>
  );
};

export default InputField;
