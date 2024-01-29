// AllProducts.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/reducers/cartSlice";
import "./AllProducts.css";
import Footer from "../components/Footer";
import EcomHomePage from "./EcomHomePage";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);

  // useEffect(() => {
  //   const fetchAllProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://dummyjson.com/products?limit=100"
  //       );
  //       setProducts(response.data.products || []);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=100"
        );
        setProducts(response.data.products || []);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(`Server Error: ${error.response.status}`);
        } else if (error.request) {
          // The request was made but no response was received
          setError("Network Error: Please check your internet connection");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  //   fetchAllProducts();
  // }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("Updated Cart in Local Storage:", cartItems);
  }, [cartItems]);

  const handleAddToCart = (product) => {
    const isInCart = cartItems.some((item) => item.id === product.id);

    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };
  const navigateToSingleProduct = (item) => {
    navigate(`/Product/${item.id}`, { state: { productData: item } });
  };
  return (
    <div className="container-fluid">
      <header>
        <EcomHomePage />
      </header>
      <div className="d-flex justify-content-center">
        {loading && <Loader />}
        {error && <div className="error-message mb-5">{error}</div>}
      </div>

      <div className="row">
        {products.map((product) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center"
            key={product.id}
          >
            <div className="product-card">
              <img
                className="product-image"
                src={product.thumbnail}
                alt="Product-Img"
                onClick={() => navigateToSingleProduct(product)}
              />
              <div className="product-details">
                <div className="product-name">{product.title}</div>
                <div className="product-price">${product.price}</div>
                <div className="discount-price">
                  ${product.discountPercentage}
                </div>
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  {cartItems.some((item) => item.id === product.id)
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </button>
              </div>
              <span className="eye-icon">&#128065;</span>
            </div>
          </div>
        ))}
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AllProducts;
