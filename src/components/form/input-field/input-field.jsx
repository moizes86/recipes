import React from "react";

import "./input-field.scss";

const InputField = ({
  label,
  name,
  value,
  type,
  handleChange,
  handleBlur,
  required,
  errors,
}) => {
  return (
    <div controlid={name} className="form-group input-shrink-animation">
      <input
        value={value}
        className={`form-control`}
        name={name}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        form="formNoValidate"
      />
      <label className={`form-label ${value.length && "shrink"}`}>{label}</label>

      {errors && <small className={`text-danger ml-1 ${errors ? "appear" : ""}`}>{errors}</small>}
    </div>
  );
};

export default InputField;

// import React from "react";

// import "./input-field.scss";

// const InputField = ({
//   label,
//   name,
//   value = "",
//   type,
//   handleChange,
//   handleBlur,
//   touched,
//   errors,
// }) => {
//   return (
//     <div controlId={name} className="form-group input-shrink-animation">
//       <input
//         className="form-control"
//         value={value}
//         name={name}
//         type={type}
//         onChange={handleChange}
//         onBlur={handleBlur}
//       />
//       <label className={`form-label ${value.length && "shrink"}`}>{label}</label>

//       {touched && errors && (
//         <small className={`text-danger ml-1 ${errors ? "appear" : ""}`}>{errors}</small>
//       )}
//     </div>
//   );
// };

// export default InputField;
