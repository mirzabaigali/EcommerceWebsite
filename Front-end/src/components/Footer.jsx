import React from "react";
import "./Footer.css";
import Qrcode from "../assets/Qrcode.png";
import Playstore from "../assets/playstore.png";
import Appstore from "../assets/appstore.png";
import Facebook from "../assets/Facebook.svg";
import Linkedin from "../assets/Linkedin.svg";
import Twitter from "../assets/twitter.svg";
import Group1 from "../assets/Group(1).svg";
import Aero from "../assets/aero.svg";
import atrate from "../assets/atrate.svg";
const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3">
            <p className="heading">Exclusive</p>
            <p className="heading2">Subscribe</p>
            <p className="heading2">Get 10% off on your first order</p>
            <div className="d-flex">
              <input
                type="text"
                name="text"
                id="text"
                className="form-control input-field-footer"
                placeholder="enter your email."
              />
              <img src={Aero} alt="aero" className="aero" />
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 mb-md-2">
            <p className="heading">Support</p>
            <p className="heading2">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <p className="heading2">exclusive@gmail.com</p>
            <p className="heading2">+88015-88888-9999</p>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-2">
            <p className="heading">Account</p>
            <p className="heading2">My Account</p>
            <p className="heading2">Login/Register</p>
            <p className="heading2">Cart</p>
            <p className="heading2">Wishlist</p>
            <p className="heading2">Shop</p>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-2">
            <p className="heading">Quick Link</p>
            <p className="heading2">Privacy Policy</p>
            <p className="heading2">Terms Of Use</p>
            <p className="heading2">FAQ</p>
            <p className="heading2">Contact</p>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-2">
            <p className="heading">Download App</p>
            <p className="heading1">Save $3 with App New User Only</p>
            <div className="row">
              <div className="col-6">
                <img src={Qrcode} alt="qr" />
              </div>
              <div className="col-6">
                <img src={Playstore} alt="qr" />
                <img src={Appstore} alt="qr" />
              </div>
            </div>
            <div className="row mt-2 ">
              <div className="col-12 d-flex justify-content-between">
                <div>
                  <img src={Facebook} alt="fb" />
                </div>
                <div>
                  <img src={Twitter} alt="twi" />
                </div>
                <div>
                  <img src={Group1} alt="ins" />
                </div>
                <div>
                  <img src={Linkedin} alt="link" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid d-flex justify-content-center copyrights">
        <p>
          <img src={atrate} alt="@" />
          Copyright Arif 2022. All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
