import React from "react";
import EcomHomePage from "./EcomHomePage";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import phone from "../assets/contact/icons-phone.svg";
import email from "../assets/contact/icons-mail.svg";
import "./Contact.css";
import Button from "../components/Button";

const Contact = () => {
  const breadcrumbItems = [
    { text: "Home", link: "/" },
    { text: "Contact" },
  ];
  return (
    <>
      <header>
        <EcomHomePage />
      </header>
      <main>
        <div className="container">
          <div className="mt-5">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="d-flex justify-content-start align-items-center">
                <img src={phone} alt="phn" />
                <p className="ps-3 pt-3">Call To Us</p>
              </div>
              <div className="contact-text-box">
                <span className="contact-text">
                  We are available 24/7, 7 days a week.
                </span>
              </div>
              <div className="contact-text-box mt-2">
                <span className="contact-text">Phone: +8801611112222</span>
              </div>
              <div className="contact-line mt-3"></div>
              <div className="d-flex justify-content-start align-items-center">
                <img src={email} alt="phn" />
                <p className="ps-3 pt-3">Write To US</p>
              </div>
              <div className="d-flex flex-column">
                <span className="contact-para1">
                  Fill out our form and we will contact you within 24 hours.
                </span>
                <span className="contact-para1">
                  Emails: customer@exclusive.com
                </span>
                <span className="contact-para1">
                  Emails: support@exclusive.com
                </span>
              </div>
            </div>
            <div className="col-md-8">
              <form className="row g-3">
                <div className="col-md-4 col-sm-12 mb-3">
                  <input
                    type="text"
                    className="form-control contact-inp1"
                    placeholder="Name"
                  />
                </div>
                <div className="col-md-4 col-sm-12 mb-3">
                  <input
                    type="email"
                    className="form-control contact-inp1"
                    placeholder="Email"
                  />
                </div>
                <div className="col-md-4 col-sm-12 mb-3">
                  <input
                    type="tel"
                    className="form-control contact-inp1"
                    placeholder="Phone"
                  />
                </div>
              </form>
              <form action="">
                <textarea
                  name=""
                  id=""
                  className="form-control contact-textarea"
                  placeholder="Your Message"
                  cols="30"
                  rows="10"
                ></textarea>
              </form>
              <div className="d-flex justify-content-end mt-4 mb-5">
                <Button label={"Send Massage"} className="contact-button"/>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Contact;
