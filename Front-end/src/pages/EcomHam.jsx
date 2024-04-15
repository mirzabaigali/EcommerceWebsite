import React from "react";
import searchIcon from "../assets/Search.svg";
import "./EcomHam.css";
import wishlist from "../assets/Wishlist.svg";
import cart from "../assets/Cart1.svg";
import user from "../assets/user.svg";

const Ham = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="ham-wrapper">
            <ul className="list">
              <li>Home</li>
              <li>Contact</li>
              <li>About</li>
              <li>SignUp</li>
            </ul>
            <div className="row d-flex justify-content-around">
              <div className="col-12 ham-input">
                <input
                  className="input-field form-control"
                  type="text"
                  name="text"
                  id="text"
                  placeholder="what are you looking for?"
                />
                <label htmlFor="text">
                  <img
                    src={searchIcon}
                    alt="search"
                    style={{ height: "40px" }}
                  />
                </label>
              </div>
              <div className="d-flex justify-content-around pt-3 pb-1">
                <div>
                  <img src={wishlist} alt="wishlist" />
                </div>
                <div>
                  <img src={cart} alt="cart" />
                </div>
                <div>
                  <img src={user} alt="user" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ham;
