import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import Sale from "./Sale";
import searchIcon from "../assets/Search.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import Ham from "./Ham";
import { AuthContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { setLoginOnly } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 780) {
        setMenu(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <Sale />
      <div className="container">
        <div className="row navbar-wrapper">
          <div className="col-12 d-flex justify-content-between">
            <div className="brand">
              <p>Exclusive</p>
            </div>
            <div className="pages">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li onClick={() => setLoginOnly(false)}>SignUp</li>
              </ul>
            </div>
            <div className="search">
              <input
                className="input-field form-control"
                type="text"
                name="text"
                id="text"
                placeholder="what are you looking for?"
              />
              <label htmlFor="text">
                <img src={searchIcon} alt="search" style={{ height: "40px" }} />
              </label>
            </div>
            {/* hamburger */}
            <div className="hamburger" onClick={handleMenu}>
              <a href="#" className="link">
                <GiHamburgerMenu />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">{menu ? <Ham /> : ""}</div>
      <div className="horizontal-line"></div>
    </>
  );
};

export default Navbar;
