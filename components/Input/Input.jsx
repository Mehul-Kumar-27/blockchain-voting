import React, { useContext } from "react";

import Style from "./Input.module.css";

const Input = ({ inputType, title, placeholder, handleClick }) => {
  return (
    <div className={Style.inputContainer}>
      <label className={Style.inputLabel}>{title}</label>
      {inputType === "text" && (
        <div className={Style.inputBox}>
          <input
            type={inputType}
            className={Style.inputForm}
            placeholder={placeholder}
            onChange={handleClick}
          />
        </div>
      )}
      {inputType === "number" && (
        <div className={Style.inputBox}>
          <input
            type={inputType}
            className={Style.inputForm}
            placeholder={placeholder}
            onChange={handleClick}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
