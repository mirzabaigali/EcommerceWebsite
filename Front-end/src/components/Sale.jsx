import React, { useState } from "react";
import Dropdown from "../assets/DropDown.svg";
import "./Sale.css";
import { useNavigate } from "react-router-dom";

const Sale = () => {
  const [selectLanguage, setSelectLanguage] = useState("English");
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSelectLanguage(e.target.value);
    setShowOptions(false);
  };
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleClick = () => {
    navigate("/allproducts");
  };
  return (
    <div className="container-fluid sale-wrapper">
      <div className="row">
        <div className="col-8">
          <p className="flash-sale">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
            <span className="shopnow blink-animation" onClick={handleClick}>
              ShopNow
            </span>
          </p>
        </div>
        <div className="col-4 dropdown">
          <label htmlFor="language">{selectLanguage}</label>
          <img src={Dropdown} alt="dropdown" onClick={toggleOptions} />
          {showOptions && (
            <div className="dropdown-options">
              <div
                onClick={() => handleChange({ target: { value: "English" } })}
              >
                English
              </div>
              <div
                onClick={() => handleChange({ target: { value: "French" } })}
              >
                French
              </div>
              <div onClick={() => handleChange({ target: { value: "Hindi" } })}>
                Hindi
              </div>
              <div
                onClick={() => handleChange({ target: { value: "Telugu" } })}
              >
                Telugu
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sale;
