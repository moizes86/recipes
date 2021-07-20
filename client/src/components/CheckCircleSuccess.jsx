import React from "react";

export const CheckCircleSuccess = ({ message }) => {
  return (
    <div className="check-circle-success">
      <i className="far fa-check-circle"></i>
      <p>{message}</p>
    </div>
  );
};

export default CheckCircleSuccess;
