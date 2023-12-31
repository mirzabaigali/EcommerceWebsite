import React from "react";
import "./Button.css";
const Button = ({ label, onClick, className, imgSrc }) => {
  return (
    <>
      <button onClick={onClick} className={className && className}>
        {imgSrc && <img src={imgSrc} alt="button-img" />}
        {label}{" "}
      </button>
    </>
  );
};

export default Button;
