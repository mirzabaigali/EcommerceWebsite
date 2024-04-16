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
import axios from "axios";
const HomeNavbar = () => {
  const [menu, setMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const cartItems = useSelector((state) => state.cart);
  const { token, swap, setSwap } = useAuth();
  const storedToken = localStorage.getItem("authToken");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${searchQuery}`
      );
      console.log("Response data:", response?.data?.products); // Log the response data
      setSearchResults(response?.data?.products);
      setError(null);
      navigate(`/allproducts?search=${searchQuery}`); // Navigate to "/allproducts" with search query as parameter
    } catch (error) {
      setError(error);
      setSearchResults([]);
    }
  };

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
    // console.log(totalCount.length);
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
  // useEffect(() => {
  //   console.log("Token:", token);
  // }, [token]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategory(response?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleCategoryClick = (category) => {
    // setSelectedCategory(category);
    navigate(`/selectedcategory`, { state: category });
  };
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
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-5 ">
                        <ul className="main-list">
                          {loading ? (
                            <div className="d-flex justify-content-center align-items-center">
                              <div class="spinner"></div>
                            </div>
                          ) : (
                            category.slice(0, 10).map((item, index) => (
                              <li
                                key={item.id || index}
                                // className={
                                //   hoveredCategory === item.id ? "zoom-in" : ""
                                // }
                                // onMouseEnter={() => setHoveredCategory(item.id)}
                                // onMouseLeave={() => setHoveredCategory(null)}
                                onClick={() => handleCategoryClick(item)}
                              >
                                {item}
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                      <div className="col-sm-5 ">
                        <ul className="main-list">
                          {loading ? (
                            // <div class="spinner"></div>
                            <></>
                          ) : (
                            category.slice(10, 20).map((item, index) => (
                              <li
                                key={item.id || index}
                                // className={
                                //   hoveredCategory === item.id ? "zoom-in" : ""
                                // }
                                // onMouseEnter={() => setHoveredCategory(item.id)}
                                // onMouseLeave={() => setHoveredCategory(null)}
                                onClick={() => handleCategoryClick(item)}
                              >
                                {item}
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
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
                {(!token || !storedToken) && (
                  <li>
                    <Link to="/signup" onClick={() => setSwap(!swap)}>
                      SignUp
                    </Link>
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
                  id="search"
                  placeholder="what are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <label htmlFor="text" onClick={handleSearch}>
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
                  <span className="badge bg-secondary badge-number rounded-pill">
                    {cartItemCount}
                  </span>
                )}
                {storedToken ? (
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
            <div>
              {error && <p>Error: {error.message}</p>}
              {searchResults.map((item, index) => (
                <div key={index}>
                  <h1>{item.name}</h1>
                </div>
              ))}
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
