import React from "react";

const FormErrorMessages = ({ errors}) => {
  return (
    <>
      {errors && errors.map((error, index) => (
        <small key={index} id="emailHelp" className="form-text text-danger">
          {error}
        </small>
      ))}
    </>
  );
};

export default FormErrorMessages;
