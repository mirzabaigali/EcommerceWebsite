import React from "react";
import "./Checkout.css";
import Footer from "../components/Footer";
import EcomHomePage from "./EcomHomePage";
import Breadcrumb from "../components/Breadcrumb";
import joystick from "../assets/controller.png";
import pc from "../assets/com.png";
import img1 from "../assets/image 30.png";
import img2 from "../assets/image 31.png";
import img3 from "../assets/image 32.png";
import img4 from "../assets/image 33.png";
import Button from "../components/Button";
const Checkout = () => {
  const breadcrumbItems = [
    { text: "Account", link: "" },
    { text: "My Account", link: "/account" },
    { text: "Product", link: "" },
    { text: "View Cart", link: "/cart" },
    { text: "CheckOut" },
  ];
  return (
    <>
      <header>
        <EcomHomePage />
      </header>
      <main>
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />
          <div className="checkout-wrapper">
            <p className="checkout-heading mt-5">Billing Details</p>
            <div className="row mt-5">
              <div className="col-md-6  ">
                <form action="">
                  <label htmlFor="first" className="label-head">
                    First Name<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="first"
                    id="first"
                    className="form-control checkout-inp"
                  />
                  <label htmlFor="company" className="label-head">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="form-control checkout-inp"
                  />
                  <label htmlFor="street" className="label-head">
                    Street Address<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    className="form-control checkout-inp"
                  />
                </form>
                <label htmlFor="apart" className="label-head">
                  Apartment, floor, etc. (optional)
                </label>
                <input
                  type="text"
                  name="aprt"
                  id="aprt"
                  className="form-control checkout-inp"
                />
                <label htmlFor="town" className="label-head">
                  Town/City<span>*</span>
                </label>
                <input
                  type="text"
                  name="town"
                  id="town"
                  className="form-control checkout-inp"
                />
                <label htmlFor="phone" className="label-head">
                  Phone Number<span>*</span>
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  className="form-control checkout-inp"
                />
                <label htmlFor="email" className="label-head">
                  Email Address<span>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control checkout-inp"
                />
                <div className="d-flex">
                  <input
                    type="checkbox"
                    name="chec"
                    id="chec"
                    className="box-check"
                  />
                  <label htmlFor="chec">
                    <p className="chec">
                      Save this information for faster check-out next time
                    </p>
                  </label>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center   mt-lg-0 mt-md-0 mt-sm-2 mt-2">
                <div className="checkout-right  text-center">
                  <table class="table table-borderless">
                    <tr>
                      <td>
                        <img src={joystick} alt="joystick" />
                      </td>
                      <td>$650</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={pc} alt="pc" />
                      </td>
                      <td>$1150</td>
                    </tr>
                  </table>
                  <table className="table table-borderless">
                    <tr>
                      <td>SubTotal</td>
                      <td>$1800</td>
                    </tr>
                  </table>
                  <div className="total-horiztanl-line"></div>
                  <table className="table table-borderless">
                    <tr>
                      <td className="test">Shipping</td>
                      <td className="test">free</td>
                    </tr>
                  </table>
                  <div className="total-horiztanl-line"></div>
                  <div className="total-box">
                    <p>Total</p>
                    <p>$1800</p>
                  </div>
                  <div className="payments d-flex justify-content-between mt-2">
                    <div>
                      <input type="radio" name="paymentMethod" id="bank" />
                      <label htmlFor="bank" className="ms-2">
                        Bank
                      </label>
                    </div>
                    <div className="credit-cards">
                      <div>
                        <img src={img1} alt="img" />
                      </div>
                      <div>
                        <img src={img2} alt="img" />
                      </div>
                      <div>
                        <img src={img3} alt="img" />
                      </div>
                      <div>
                        <img src={img4} alt="img" />
                      </div>
                    </div>
                  </div>
                  <div className="payments d-flex justify-content-start align-items-baseline mt-2">
                    <input type="radio" name="paymentMethod" id="cash" />
                    <label htmlFor="cash" className="cash">
                      Cash on delivery
                    </label>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control payment-input"
                    />
                    <Button label={"Apply Coupon"} className={"couon-button"} />
                  </div>
                  <div className="mt-5 d-flex justify-content-start">
                    <Button label={"Place Order"} className={"couon-button"} />
                  </div>
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

export default Checkout;
