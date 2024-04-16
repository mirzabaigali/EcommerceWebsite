import React, { useState } from "react";
import searchIcon from "../assets/Search.svg";
import "./EcomHam.css";
import wishlist from "../assets/Wishlist.svg";
import cart from "../assets/Cart1.svg";
import user from "../assets/user.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Ham = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="ham-wrapper">
            <ul className="list">
              <li>
                <Link to="/">Home</Link>
              </li>{" "}
              <li>
                <Link to="/contact">Contact</Link>
              </li>{" "}
              <li>
                <Link to="/about">About</Link>
              </li>{" "}
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </ul>
            <div className="row d-flex justify-content-around">
              <div className="col-12 ham-input">
                <input
                  className="input-field form-control"
                  type="text"
                  name="text"
                  id="text"
                  placeholder="what are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <label htmlFor="text">
                  <img
                    src={searchIcon}
                    alt="search"
                    style={{ height: "40px" }}
                    onClick={handleSearch}
                  />
                </label>
              </div>
              <div className="d-flex justify-content-around pt-3 pb-1">
                <div>
                  <img
                    src={wishlist}
                    alt="wishlist"
                    onClick={() => navigate("/wishlist")}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div>
                  <img
                    src={cart}
                    alt="cart"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/cart")}
                  />
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
