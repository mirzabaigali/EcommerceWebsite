import React, { useEffect, useState } from "react";
import EcomHomePage from "./EcomHomePage";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/reducers/cartSlice";
import Loader from "../components/Loader";
import Breadcrumb from "../components/Breadcrumb";
import { toast } from "react-toastify";

const SelectedCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const category = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const breadcrumbItems = [{ text: "Home", link: "/" }, { text: category }];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/category/${category}`
        );
        setProducts(response?.data?.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

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
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <header>
        <EcomHomePage />
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="mx-5 mb-3">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          <div className="d-flex justify-content-center">
            {loading && <Loader />}
          </div>
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
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default SelectedCategory;
