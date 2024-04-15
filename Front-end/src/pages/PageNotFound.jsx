import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import EcomHomePage from "./EcomHomePage";
import Button from "../components/Button";
import Footer from "../components/Footer";
import "./PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const breadcrumbItems = [
    { text: "Home", link: "/MainPage" },
    { text: "404 Error" },
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
          <div className="row">
            <div className="col-md-12 d-flex flex-column justify-content-center  text-center">
              <span className="NotFound">404 Not Found</span>
              <span className="mt-5 NotFound-text">
                Your visited page not found. You may go home page.
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center mt-5 mb-5">
              <Link to="/">
                <Button
                  label={"Back to home page"}
                  className="notfound-button"
                />
              </Link>
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

export default PageNotFound;
