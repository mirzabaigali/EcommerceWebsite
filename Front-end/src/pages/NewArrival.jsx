import React from "react";
import line from "../assets/Rectangleline.svg";
import van from "../assets/About/icon-delivery.svg";
import cxservice from "../assets/About/Icon-Customer service.svg";
import blackcircle from "../assets/About/blackcircle.svg";
import shield from "../assets/About/shield-tick.svg";
import image1 from "../assets/new images/Frame 684.png";
import image2 from "../assets/new images/Frame 685.png";
import image3 from "../assets/new images/Frame 686.png";
import image4 from "../assets/new images/Frame 687.png";
const NewArrival = () => {
  return (
    <div className="mt-5">
      <div className="d-flex align-items-baseline">
        <div>
          <img src={line} alt="" className="small-line" />
        </div>
        <div className="ms-2">
          <p className="sale-text">Featured</p>
        </div>
      </div>
      <div>
        <h3>New Arrivals</h3>
        <div className="row d-flex justify-content-around">
          <div className="col-lg-6 text-md-center text-sm-center">
            <img src={image1} alt="pic" className="img-fluid" />
          </div>
          <div className="col-lg-6">
            <div className="col-md-12 col-sm-12 mt-sm-2 mt-md-2 mt-lg-0 text-md-center text-sm-center mt-2">
              <img src={image2} alt="pic" className="img-fluid" />
            </div>
            <div className="d-flex justify-content-between mt-2 text-md-center text-sm-center">
              <div className="col-md-6">
                <img src={image3} alt="pic" className="img-fluid" />
              </div>
              <div className="col-md-6">
                <img src={image4} alt="pic" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row d-flex justify-content-md-center justify-content-sm-between">
          <div className="col-sm-3">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img src={blackcircle} alt="" />
              <img src={van} alt="" className="img-services" />
              <span className="para2">FREE AND FAST DELIVERY</span>
              <span className="para3 mb-3">
                Free delivery for all orders over $140
              </span>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img src={blackcircle} alt="" />
              <img src={cxservice} alt="" className="img-services" />
              <span className="para2">24/7 CUSTOMER SERVICE</span>
              <span className="para3 mb-3">Friendly 24/7 customer support</span>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img src={blackcircle} alt="" />
              <img src={shield} alt="" className="img-services" />
              <span className="para2">MONEY BACK GUARANTEE</span>
              <span className="para3 mb-3">We return money within 30 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
