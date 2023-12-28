import React, { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import EcomHomePage from "./EcomHomePage";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
const Cart = () => {
  const breadcrumbItems = [{ text: "Home", link: "/" }, { text: "Cart" }];
  const [items, setitems] = useState([0]);
  const navigate = useNavigate();
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
            <table class="table table-hover table-responsive">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantitiy</th>
                  <th scope="col">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>$650</td>
                  <td>
                    <input
                      type="number"
                      name="number"
                      id="number"
                      className="input-field cart-inp"
                      min={0}
                    />
                  </td>
                  <td>$650</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          )}
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
                    <Button label={"Apply Coupon"} className={"wishlist-btn"} />
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center mt-lg-0  mt-sm-2 mt-2">
              <div className="total-wrapper">
                <p className="mt-3 mb-3 ms-2">Cart Total</p>
                <table class="table">
                  <tbody className="me-3">
                    <tr>
                      <th scope="row">Subtotal</th>
                      <td>$650</td>
                    </tr>
                    <tr>
                      <th scope="row">Shipping</th>
                      <td>$1100</td>
                    </tr>
                    <tr style={{ border: "none !important" }}>
                      <th>Total</th>
                      <td>$1750</td>
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
        </div>
      </main>
      <footer className="mt-5">
        <Footer />
      </footer>
    </>
  );
};

export default Cart;
