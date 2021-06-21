import React from "react";

import "./custom-button.scss";

const CustomButton = ({ children, handleClick }) => (
  <button onClick={handleClick}  className="custom-button" type='submit'>
    {children}
  </button>
);
export default CustomButton;
