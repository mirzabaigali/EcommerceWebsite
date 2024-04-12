import React, { useState, useMemo, useEffect } from "react";
import EcomHomePage from "./EcomHomePage";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";
import del from "../assets/icon-delete.svg";
import line from "../assets/Rectangleline.svg";
import "./WishList.css";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/reducers/wishListSlice";

const Wishlist = () => {
  const breadcrumbItems = [{ text: "Home", link: "/" }, { text: "WishList" }];
  const dispatch = useDispatch();

  // Use useMemo to memoize the wishlistItems
  const wishlistItems = useSelector((state) => state.wishlist) || [];
  const memoizedWishlistItems = useMemo(() => wishlistItems, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(memoizedWishlistItems));
  }, [memoizedWishlistItems]);

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  return (
    <>
      <header>
        <EcomHomePage />
      </header>
      <main>
        <div className="container mt-5">
          <Breadcrumb items={breadcrumbItems} />
          {memoizedWishlistItems?.length === 0 ? (
            <p>
              No items in your wishlist. <Link to="/">Go back to home</Link>
            </p>
          ) : (
            <>
              <div className="wishlist-wrapper d-flex justify-content-between align-items-center">
                <p>Wishlist({memoizedWishlistItems?.length})</p>
                <div>
                  <Button
                    label={"Move All To Bag"}
                    className={"wishlist-btn"}
                  />
                </div>
              </div>
              <div className="wishlistcard-wrapper row row-cols-1  row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
                {memoizedWishlistItems.map((item) => (
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
                          <img src={del} alt="del" />
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

              <div className="d-flex justify-content-between mt-5">
                <div className="d-flex align-items-baseline">
                  <div>
                    <img src={line} alt="" className="small-line" />
                  </div>
                  <div className="ms-2">
                    <p className="sale-text">Just For You</p>
                  </div>
                </div>
                <Button label={"See All"} className={"wishlist-btn"} />
              </div>
              <div className="container m-0 p-0">
                <div className="row">
                  {memoizedWishlistItems?.map((item, ind) => {
                    const {
                      originalPrice,
                      itemName,
                      image,
                      ratings,
                      salePrice,
                      discountPercentage,
                    } = item;
                    return (
                      <Card
                        originalPrice={originalPrice}
                        itemName={itemName}
                        ratings={ratings}
                        salePrice={salePrice}
                        discountPercentage={discountPercentage}
                        image={image}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <footer className="mt-5">
        <Footer />
      </footer>
    </>
  );
};

export default Wishlist;
