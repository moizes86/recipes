import React from "react";

// Styles
import Form from "react-bootstrap/Form";
import "./input-field.scss";

const InputField = ({
  label,
  name,
  value = "",
  type,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  return (
    <Form.Group controlId={name} className="input-field">
      <Form.Control
        value={value}
        name={name}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Form.Label className={`${value.length && "shrink"}`}>{label}</Form.Label>

      {touched && errors && (
        <small className={`text-danger ml-1 ${errors ? "appear" : ""}`}>{errors}</small>
      )}
    </Form.Group>
  );
};

export default InputField;
