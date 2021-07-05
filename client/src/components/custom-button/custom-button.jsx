import React from "react";

import "./custom-button.scss";

const CustomButton = ({ children, handleClick, disabled, type }) => (
  <button className="custom-button"  onClick={handleClick} type={type} disabled={disabled}>
    {children}
  </button>
);
export default CustomButton;
