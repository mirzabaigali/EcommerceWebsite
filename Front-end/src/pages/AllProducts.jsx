import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import "./AllProducts.css";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
  }, []);
console.log(products)
  return (
    <div className="container-fluid">
      {loading && (
        <div className="loading d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      )}
      <div className="row">
        {products.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center">
            <div className="product-card">
              <img
                className="product-image"
                src={product.thumbnail}
                alt="Product Image"
              />
              <div className="product-details">
                <div className="product-name">{product.title}</div>
                <div className="product-price">${product.price}</div>
                <div className="discount-price">${product.discountPercentage}</div>
                <button className="add-to-cart">Add to Cart</button>
              </div>
              <span className="eye-icon">&#128065;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
