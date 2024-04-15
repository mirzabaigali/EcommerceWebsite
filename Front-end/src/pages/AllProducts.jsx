// AllProducts.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/reducers/cartSlice";
import "./AllProducts.css";
import Footer from "../components/Footer";
import EcomHomePage from "./EcomHomePage";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(16);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const currentLocation = window.location;
  const searchQuery = new URLSearchParams(currentLocation.search).get("search");

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "https://dummyjson.com/products?limit=100";

        // If there's a search query, fetch search-related products
        if (searchQuery) {
          url = `https://dummyjson.com/products/search?q=${searchQuery}`;
        }

        const response = await axios.get(url);
        setProducts(response.data.products || []);
        setError(null);
      } catch (error) {
        if (error.response) {
          setError(`Server Error: ${error.response.status}`);
        } else if (error.request) {
          setError("Network Error: Please check your internet connection");
        } else {
          setError("Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("Updated Cart in Local Storage:", cartItems);
  }, [cartItems]);

  const handleAddToCart = (product) => {
    const isInCart = cartItems.some((item) => item.id === product.id);

    if (isInCart) {
      toast.warning(`${product.title} removed from cart!`, {
        theme: "colored",
      });
      dispatch(removeFromCart(product.id));
    } else {
      toast.info(`${product.title} added to cart!`, {
        theme: "colored",
      });
      dispatch(addToCart(product));
    }
  };
  const navigateToSingleProduct = (item) => {
    navigate(`/Product/${item.id}`, { state: { productData: item } });
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

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
        {!loading && <h1 className="mx-4 mb-2">All Products</h1>}
        {products.length === 0 && !loading && (
          <div className="mx-4 mb-2">
            No products found.Go back to <Link to="/">home</Link>
          </div>
        )}
        {currentItems.map((product) => (
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
      <div className="container pagination-container d-flex justify-content-end mt-5 mb-3">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={products.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          prevPageText="Prev"
          nextPageText="Next"
          firstPageText="First"
          lastPageText="Last"
        />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AllProducts;
