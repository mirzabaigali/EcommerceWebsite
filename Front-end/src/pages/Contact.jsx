import React, { useState } from "react";
import EcomHomePage from "./EcomHomePage";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import phone from "../assets/contact/icons-phone.svg";
import email from "../assets/contact/icons-mail.svg";
import "./Contact.css";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const breadcrumbItems = [{ text: "Home", link: "/" }, { text: "Contact" }];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("Form data:", formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Assuming phone numbers are 10 digits only

    // Validation for each field
    if (formData.name.trim() === "") {
      // alert("Name field cannot be empty.");
      toast.warning("Name field cannot be empty");
      return;
    }
    if (!emailRegex.test(formData.email.trim())) {
      toast.warning("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(formData.phone.trim())) {
      toast.warning("Please enter a valid 10-digit phone number.");
      return;
    }
    if (formData.message.trim() === "") {
      toast.warning("Message field cannot be empty.");
      return;
    }
    try {
      await axios.post("https://ecommerce-backend-1-qzcn.onrender.com/api/contact", formData);
      toast.success("Form submitted successfully");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

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
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control contact-inp1"
                    placeholder="Name"
                  />
                </div>
                <div className="col-md-4 col-sm-12 mb-3">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control contact-inp1"
                    placeholder="Email"
                  />
                </div>
                <div className="col-md-4 col-sm-12 mb-3">
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control contact-inp1"
                    placeholder="Phone"
                  />
                </div>
              </form>
              <form action="">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control contact-textarea"
                  placeholder="Your Message"
                  cols="30"
                  rows="10"
                ></textarea>
              </form>
              <div className="d-flex justify-content-end mt-4 mb-5">
                <Button
                  label={"Send Massage"}
                  onClick={handleSubmit}
                  className="contact-button"
                />
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
