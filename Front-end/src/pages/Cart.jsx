import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import EcomHomePage from "./EcomHomePage";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = () => {
  const breadcrumbItems = [{ text: "Home", link: "/" }, { text: "Cart" }];
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  // Update local state when cart changes
  useEffect(() => {
    setItems(cart);
  }, [cart]);

  const subtotal = items.reduce((total, item, index) => {
    const quantity = quantities[index] || 1;
    return total + quantity * item.discountPercentage;
  }, 0);
  console.log(subtotal);
  const shippingCost = 20;

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
              <table className="table table-hover table-responsive">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">
                        {index + 1} {item.title}
                      </th>
                      <td>${item.discountPercentage}</td>
                      <td>
                        <input
                          type="number"
                          name={`quantity-${index}`}
                          id={`quantity-${index}`}
                          className="input-field cart-inp"
                          min={0}
                          value={quantities[index] || 1}
                          onChange={(e) => {
                            setQuantities({
                              ...quantities,
                              [index]: parseInt(e.target.value, 10) || 0,
                            });
                          }}
                        />
                      </td>
                      <td>
                        ${((quantities[index] || 1) * item.discountPercentage).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-between">
                <Button label={"Return To Home"} className={"wishlist-btn"} />
                <Button label={"Update Cart"} className={"wishlist-btn"} />
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="row d-flex align-items-baseline">
                    <div className="col-7">
                      <input type="text" id="coupon" className="form-control" />
                    </div>
                    <div className="col-5">
                      <label htmlFor="coupon">
                        <Button
                          label={"Apply Coupon"}
                          className={"wishlist-btn"}
                        />
                      </label>
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
                              (subtotal < 200 ? shippingCost : 0)
                            ).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                      <Button
                        label={"Process to checkout"}
                        className={"custom-button"}
                        onClick={() => navigate("/checkout")}
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
