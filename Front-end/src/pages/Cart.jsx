import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import EcomHomePage from "./EcomHomePage";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/reducers/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import "./Cart.css";

const Cart = () => {
  const breadcrumbItems = [{ text: "Home", link: "/" }, { text: "Cart" }];
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponFeedback, setCouponFeedback] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log("cart================>", cart);
  // Update local state when cart changes
  useEffect(() => {
    const storedQuantities = JSON.parse(localStorage.getItem("quantities"));
    const storedCoupon = JSON.parse(localStorage.getItem("coupon"));
    if (storedQuantities) {
      setQuantities(storedQuantities);
    }
    if (storedCoupon) {
      setCouponCode(storedCoupon.code);
      setDiscountApplied(storedCoupon.applied);
      setCouponFeedback(storedCoupon.feedback);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("quantities", JSON.stringify(quantities));
    localStorage.setItem(
      "coupon",
      JSON.stringify({
        code: couponCode,
        applied: discountApplied,
        feedback: couponFeedback,
      })
    );
    setItems(cart);
  }, [cart, quantities, couponCode, discountApplied, couponFeedback]);

  useEffect(() => {
    // Check if the cart is empty and reset quantities, coupon, and feedback
    if (cart.length === 0) {
      setQuantities({});
      setCouponCode("");
      setDiscountApplied(false);
      setCouponFeedback("");
    }
  }, [cart]);
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "TENOFF") {
      setDiscountApplied(true);
      setCouponFeedback("Coupon applied successfully!");
    } else {
      setDiscountApplied(false);
      setCouponFeedback("Invalid coupon code. Please try again.");
    }
  };
  const subtotal = items.reduce((total, item, index) => {
    const quantity = quantities[index] || 1;
    if (item.discountPercentage !== undefined) {
      return total + quantity * item.discountPercentage;
    } else {
      // If item.discountPercentage doesn't exist, use original price
      return total + quantity * (item.price * 0.9).toFixed(2);
    }
  }, 0);
  const shippingCost = 20;
  const handleRemoveItem = (index) => {
    // Dispatch an action to remove the item from the cart

    dispatch(removeFromCart(index));
    toast.error("item removed from cart");

    // Update the local state accordingly (remove the item from 'items' and 'quantities')
    const updatedItems = [...items];
    updatedItems.splice(index, 1);

    const updatedQuantities = { ...quantities };
    delete updatedQuantities[index];

    setItems(updatedItems);
    setQuantities(updatedQuantities);
  };

  return (
    <>
      <header>
        <EcomHomePage />
      </header>
      <main>
        <div className="container mt-5">
          <Breadcrumb items={breadcrumbItems} />
          {items.length === 0 ? (
            <p>
              No items in your Cart. <Link to="/">Go back to home</Link>
            </p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      // console.log(`Item ${index}:`, item);

                      <tr key={index}>
                        <th scope="row" style={{ width: "40%" }}>
                          {index + 1}{" "}
                          <img
                            src={
                              item.images
                                ? item.images[3]
                                  ? item.images[3]
                                  : item.images[0]
                                : item.image
                            }
                            alt="img"
                            style={{
                              paddingLeft: "10px",
                              width: "10%",
                              aspectRatio: "3/2",
                              objectFit: "cover",
                              backgroundColor: "#fff",
                            }}
                          />{" "}
                          <span className="ms-2">{item.title}</span>
                        </th>
                        <td>
                          $
                          {/* {item.discountPercentage || item.price
                            ? (item.price * 0.9).toFixed(2)
                            : item.price} */}
                          {item.discountPercentage ||
                            (item.price * 0.9).toFixed(2)}
                        </td>
                        <td>
                          <input
                            type="number"
                            name={`quantity-${index}`}
                            id={`quantity-${index}`}
                            className="input-field cart-inp"
                            min={0}
                            max={10}
                            value={quantities[index] || 1}
                            onChange={(e) => {
                              const newValue =
                                parseInt(e.target.value, 10) || 1;
                              // Check if the new value is greater than 10
                              if (newValue > 10) {
                                setQuantities({
                                  ...quantities,
                                  [index]: 10,
                                });
                              } else {
                                // If within the valid range, update the state with the new value
                                setQuantities({
                                  ...quantities,
                                  [index]: newValue,
                                });
                              }
                            }}
                          />
                        </td>
                        <td>
                          $
                          {(
                            (quantities[index] || 1) *
                              item.discountPercentage ||
                            (quantities[index] || 1) *
                              (item.price * 0.9).toFixed(2)
                          ).toFixed(2)}
                        </td>
                        <td>
                          <span
                            className="delete-icon"
                            onClick={() => handleRemoveItem(item.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <RiDeleteBin6Line />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between">
                <Button
                  label={"Return To Home"}
                  className={"wishlist-btn"}
                  onClick={() => navigate("/")}
                />
                <Button
                  label={"Update Cart"}
                  className={"wishlist-btn"}
                  onClick={() => navigate("/allproducts")}
                />
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="row d-flex align-items-baseline">
                    <div className="col-7">
                      <input
                        type="text"
                        id="coupon"
                        className={`form-control ${
                          discountApplied ? "is-valid" : "is-invalid"
                        }`}
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponFeedback("");
                        }}
                      />
                    </div>
                    <div className="col-5">
                      <label htmlFor="coupon">
                        <Button
                          label={"Apply Coupon"}
                          className={"wishlist-btn"}
                          onClick={applyCoupon}
                        />
                      </label>
                    </div>
                    <div className="col-12">
                      <p className="mt-5">
                        To get an extra 10% off, apply coupon code:{" "}
                        <strong>TENOFF</strong>
                      </p>
                      <p
                        className={
                          couponFeedback
                            ? couponFeedback.includes("Invalid")
                              ? "text-danger"
                              : "text-success"
                            : ""
                        }
                      >
                        {couponFeedback}
                      </p>
                      <p>Free shipping for Orders above 200!</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-flex justify-content-center mt-lg-0  mt-sm-2 mt-2">
                  <div className="total-wrapper">
                    <p className="mt-3 mb-3 ms-2">Cart Total</p>
                    <table className="table">
                      <tbody className="me-3">
                        {/* Calculate and display the total based on the items in the cart */}
                        <tr>
                          <th scope="row">Subtotal</th>
                          <td>${subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <th scope="row">Shipping</th>
                          <td>${subtotal < 200 ? shippingCost : 0}</td>
                        </tr>
                        <tr style={{ border: "none !important" }}>
                          <th>Total</th>
                          {/* <td>${subtotal + shippingCost}</td> */}
                          <td>
                            $
                            {(
                              +subtotal.toFixed(2) +
                              (subtotal < 200 ? shippingCost : 0) -
                              (discountApplied ? subtotal * 0.1 : 0)
                            ).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                      <Button
                        label={"Process to checkout"}
                        className={"custom-button"}
                        onClick={() => {
                          const itemsWithQuantity = items.map(
                            (item, index) => ({
                              ...item,
                              price: item.discountedPrice,
                              originalPrice: item.price,
                              quantity: quantities[index] || 1,
                            })
                          );

                          let total = subtotal;
                          let finalTotal = total;

                          if (discountApplied) {
                            finalTotal = total * 0.9; // Apply 10% discount if coupon applied
                          }

                          navigate("/checkout", {
                            state: {
                              items: itemsWithQuantity,
                              subtotal: subtotal,
                              shippingCost: subtotal < 200 ? 20 : 0,
                              finalTotal: finalTotal,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
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

export default Cart;
