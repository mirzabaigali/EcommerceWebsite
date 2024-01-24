import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cartSlice";
import "./AllProducts.css";
import Footer from "../components/Footer";
import EcomHomePage from "./EcomHomePage";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=100"
        );
        setProducts(response.data.products || []);
      } catch (error) {
        console.log(error);
      } finally {
        // Set loading state to false when data is fetched, regardless of success or error
        setLoading(false);
      }
    };

    fetchAllProducts();
    window.scrollTo(0, 0);
    // const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    // setCartItems(storedCartItems);
    // localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const navigateToSingleProduct = (item) => {
    navigate(`/Product/${item.id}`, { state: { productData: item } });
  };

  const handleAddToCart = (product) => {
    const isInCart = cartItems.some((item) => item.id === product.id);

    if (isInCart) {
      // If product is already in the cart, remove it
      const updatedCart = cartItems.filter((item) => item.id !== product.id);
      setCartItems(updatedCart);
      // dispatch(removeFromCart(product.id)); // Assuming you have a removeFromCart action in your redux slice
    } else {
      // If product is not in the cart, add it
      const updatedCart = [...cartItems, product];
      setCartItems(updatedCart);
      dispatch(addToCart(product));
    }
  };
  return (
    <div className="container-fluid">
      <header>
        <EcomHomePage />
      </header>
      {loading && (
        <div className="loading d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      )}
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
