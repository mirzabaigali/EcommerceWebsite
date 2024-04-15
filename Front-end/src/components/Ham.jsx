import React, { useContext } from "react";
import "./Ham.css";
import searchIcon from "../assets/Search.svg";
// import { AuthContext } from "../Context/AppContext";

const Ham = () => {
  // const { setLoginOnly } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="ham-wrapper">
            <ul className="list">
              <li>Home</li>
              <li>Contact</li>
              <li>About</li>
              {/* <li onClick={() => setLoginOnly(false)}>SignUp</li> */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ham;
