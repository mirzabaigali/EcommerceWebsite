import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sale from "../components/Sale";
import EcomHam from "../pages/EcomHam";
import searchIcon from "../assets/Search.svg";
import DropDown from "../assets/DropDown1.svg";
import "./HomeNavbar.css";
import wishlist from "../assets/Wishlist.svg";
import cart from "../assets/Cart1.svg";
import user from "../assets/user.svg";
import userAccount from "../assets/userAccount.svg";
import logoutimg from "../assets/Icon-logout.svg";
import myOrder from "../assets/My-Oders.svg";
import cancel from "../assets/icon-cancel.svg";
import reviews from "../assets/Icon-Reviews.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AppContext";
import { useSelector } from "react-redux";
const HomeNavbar = () => {
  const [menu, setMenu] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const cartItems = useSelector((state) => state.cart);
  const { token } = useAuth();
  const navigate = useNavigate();
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
  useEffect(() => {
    // Calculate the total count of items in the cart
    const totalCount = cartItems;
    console.log(totalCount.length);
    setCartItemCount(totalCount.length);
  }, [cartItems]);

  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleLogout = () => {
    console.log("Logout button clicked");
    localStorage.removeItem("authToken");
    navigate("/SignUp");
    window.location.reload();
  };
  useEffect(() => {
    console.log("Token:", token);
  }, [token]);
  return (
    <>
      <Sale />
      <div className="container">
        <div className="row navbar-wrapper">
          <div className="col-12 d-flex justify-content-between">
            <div className="brand">
              <span>Exclusive</span>
              <span>
                <button
                  className="btn btn-secondary mx-2 d-lg-none"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#mainOffcanvas"
                  aria-controls="mainOffcanvas"
                >
                  <GiHamburgerMenu />
                </button>
                <div
                  className="offcanvas offcanvas-start"
                  data-bs-scroll="true"
                  tabIndex="-1"
                  id="mainOffcanvas"
                  aria-labelledby="mainOffcanvasLabel"
                >
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="mainOffcanvasLabel">
                      Categories
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <ul className="main-list">
                    <li>
                      Woman’s Fashion
                      <span className="main-dropdown">
                        <img src={DropDown} alt="" />
                      </span>
                    </li>
                    <li>
                      Men’s Fashion
                      <span className="main-dropdown1">
                        <img src={DropDown} alt="" />
                      </span>
                    </li>
                    <li>Electronics</li>
                    <li>Home & Lifestyle</li>
                    <li>Medicine</li>
                    <li>Sports & Outdoor</li>
                    <li>Baby’s & Toys</li>
                    <li>Groceries & Pets</li>
                    <li>Health & Beauty</li>
                  </ul>
                </div>
              </span>
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
                  <Link to="/About">About</Link>
                </li>
                {!token && (
                  <li>
                    <Link to="/signup">SignUp</Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="d-flex gap-2">
              <div className="search">
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
              <div className="extraLinks">
                <img
                  src={wishlist}
                  alt="wishlist"
                  onClick={() => navigate("/wishlist")}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={cart}
                  alt="cart"
                  onClick={() => navigate("/cart")}
                  style={{ cursor: "pointer" }}
                />
                {cartItemCount > 0 && (
                  <span className="badge bg-secondary badge-number rounded-pill">{cartItemCount}</span>
                )}
                {token ? (
                  <>
                    <img
                      src={user}
                      alt="user"
                      className="dropdown-toggle"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <ul
                      className="dropdown-menu custom-dropdown"
                      aria-labelledby="userDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item d-flex justify-content-evenly"
                          to="#"
                        >
                          <img src={userAccount} alt="acc" /> <p>My Account</p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item d-flex justify-content-evenly"
                          to="#"
                        >
                          <img src={myOrder} alt="acc" /> <p> My Orders</p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item d-flex justify-content-evenly"
                          to="#"
                        >
                          <img src={cancel} alt="acc" /> <p> My Orders</p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item d-flex justify-content-evenly"
                          to="#"
                        >
                          <img src={reviews} alt="acc" /> <p>My Reviews</p>
                        </Link>
                      </li>
                      <li onClick={handleLogout}>
                        <Link
                          className="dropdown-item d-flex justify-content-evenly"
                          to="#"
                        >
                          <img src={logoutimg} alt="acc" /> <p>Logout</p>
                        </Link>
                      </li>
                    </ul>
                  </>
                ) : (
                  ""
                )}
                {/* </div> */}
              </div>
            </div>
            {/* hamburger */}
            <div className="hamburger" onClick={handleMenu}>
              <Link to="#" className="link">
                <GiHamburgerMenu />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">{menu ? <EcomHam /> : ""}</div>
      <div className="horizontal-line"></div>
    </>
  );
};

export default HomeNavbar;
