import React from "react";

import "../styles/styles.scss";

const CustomButton = ({ children, handleClick, disabled, type }) => (
  <div className="custom-button-container">
    <button className="custom-button" onClick={handleClick} type={type} disabled={disabled}>
      {children}
    </button>
  </div>
);
export default CustomButton;
