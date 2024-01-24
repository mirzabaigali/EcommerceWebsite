import React, { useState } from "react";
import Footer from "../components/Footer";
import EcomHomePage from "./EcomHomePage";
import Breadcrumb from "../components/Breadcrumb";
import fillstar from "../assets/fillstar.svg";
import emptystar from "../assets/emptystar.svg";
import { FiPlus } from "react-icons/fi";
import { BiMinus } from "react-icons/bi";
import wishlist from "../assets/Wishlist.svg";
import van from "../assets/icon-delivery.svg";
import reverse from "../assets/Icon-return.svg";
import Button from "../components/Button";
import line from "../assets/Rectangleline.svg";
import { useLocation } from "react-router-dom";
import "./SingleProduct.css";

const SingleProduct = () => {
  const breadcrumbItems = [
    { text: "Home", link: "/" },
    { text: "Product Name" },
  ];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const Relateditems = [
    {
      id: 1,
      image: "https://via.placeholder.com/268x200?text=Product+1",
      itemName: "Product 1",
      salePrice: 25.99,
      originalPrice: 39.99,
      ratings: 4.5,
      discountPercentage: 35,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/268x200?text=Product+2",
      itemName: "Product 2",
      salePrice: 19.99,
      originalPrice: 29.99,
      ratings: 4.2,
      discountPercentage: 33,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/268x200?text=Product+3",
      itemName: "Product 3",
      salePrice: 14.99,
      originalPrice: 24.99,
      ratings: 4.0,
      discountPercentage: 40,
    },
    {
      id: 4,
      image: "https://via.placeholder.com/268x200?text=Product+4",
      itemName: "Product 4",
      salePrice: 34.99,
      originalPrice: 49.99,
      ratings: 4.8,
      discountPercentage: 30,
    },
  ];

  const [items, setItems] = useState(Relateditems);
  const location = useLocation();
  const productData = location.state.productData;
  console.log(productData);
  const discountPercentage = Math.floor(Math.random() * (25 - 10 + 1) + 10);

  // Calculate sale price
  const originalPrice = productData.price;
  const salePrice = originalPrice - (originalPrice * discountPercentage) / 100;

  return (
    <>
      <header>
        <EcomHomePage />
      </header>
      <main>
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />
          <div className="row mt-4">
            <div className="col-md-7 d-flex gap-1 ">
              <div className="thumbnail-images mt-5 d-flex flex-column">
                {productData &&
                  Array.isArray(productData.images) &&
                  productData.images.length > 0 &&
                  productData.images.map((item) => (
                    <img
                      key={item.id}
                      src={item}
                      alt={item.itemName}
                      className="thumbnail"
                    />
                  ))}
              </div>
              <div className="main-product-image">
                <img
                  // src="https://via.placeholder.com/500x500.png?text=Placeholder+Image"
                  src={productData.image || productData.thumbnail}
                  alt="Main Product"
                  className="main-img"
                />
              </div>
            </div>
            <div className="col-md-5 d-sm-flex flex-sm-column justify-content-sm-center d-md-block">
              <p className="product-name">{productData.title}</p>
              <div className="d-flex justify-content-start align-items-baseline">
                <img src={fillstar} alt="" />
                <img src={fillstar} alt="" />
                <img src={fillstar} alt="" />
                <img src={fillstar} alt="" />
                <img src={emptystar} alt="" />
                <p className="ms-2">(150 Reviews)</p>
                <div className="divider ms-3"></div>
                <p className="stock ms-2">In Stock</p>
              </div>
              <p className="price">${salePrice.toFixed(2)}</p>
              <p className="describtion">{productData.description}</p>
              <div className="divider1"></div>
              <div className="d-lg-flex  mt-3">
                <p className="me-3">Size:</p>
                <div className="d-flex mb-sm-3 mb-3 size-box-wrapper">
                  {sizes.map((item, ind) => (
                    <div className="size-box me-4">
                      <div key={ind}>{item}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-lg-flex d-sm-block gap-3">
                <div className="d-flex justify-content-sm-start mb-sm-3 mb-md-3 mb-lg-0 mb-3">
                  <div className="pmbtn-wrapper">
                    <span onClick={decreaseQuantity} className="pmbtn">
                      <BiMinus />
                    </span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="value-inp"
                    />
                  </div>
                  <div className="pmbtn-wrapper">
                    <span onClick={increaseQuantity} className="pmbtn">
                      <FiPlus />
                    </span>
                  </div>
                </div>
                <div className="d-lg-flex d-md-flex d-sm-flex d-flex ">
                  <Button label={"Buy Now"} className={"product-btn1"} />
                  <div className="size-box-wrapper d-flex justify-content-sm-between align-items-center ms-lg-2 ms-md-2 ms-sm-3 ms-5">
                    <div className="size-box">
                      <img src={wishlist} alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="product-policy mt-4 ">
                {/* Top Box */}
                <div className="policy-box">
                  <img src={van} alt="" className="ms-3 mt-2" />
                  <div className="delivery-policy">
                    <span className="para4">Free Delivery</span>
                    <br />
                    <span className="para3">
                      Enter your postal code for Delivery Availability
                    </span>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="policy-divider"></div>

                {/* Bottom Box */}
                <div className="policy-box">
                  <img src={reverse} alt="" className="ms-3 mb-5" />
                  <div className="delivery-policy reverse-box-policy">
                    <span className="para4">Return Delivery</span>
                    <br />
                    <span className="para5 mb-5">
                      Free 30 Days Delivery Returns. Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="category-name d-flex align-items-baseline mt-3">
            <div>
              <img src={line} alt="" className="small-line" />
            </div>
            <div className="ms-2">
              <p className="sale-text">Related Items</p>
            </div>
          </div>
          <div className="wishlistcard-wrapper row row-cols-1  row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
            {items.map((item) => (
              <div
                className="wishlist-card col-auto col-sm-6 col-md-6 col-lg-3"
                key={item.id}
              >
                <div className="card sale-card">
                  <div className="discount-box">
                    <span className="discount-percentage">
                      -{item.discountPercentage}%
                    </span>
                  </div>
                  <div className="sale-cardbody">
                    <img
                      src={item.image}
                      alt={item.itemName}
                      className="img-fluid"
                    />
                    <div className="d-flex flex-column gap-2 align-items-end pe-2">
                      {/* <img src={del} alt="del" /> */}
                    </div>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <p className="sale-itemName">{item.itemName}</p>
                    <div className="d-flex justify-content-between">
                      <p className="sale-price">{item.salePrice}</p>{" "}
                      <span className="sale-price1 text-decoration-line-through">
                        {item.originalPrice}
                      </span>
                    </div>
                    <p className="sale-rating">{item.ratings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="mt-3">
        <Footer />
      </footer>
    </>
  );
};

export default SingleProduct;
