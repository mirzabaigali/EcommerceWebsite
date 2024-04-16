import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import line from "../assets/Rectangleline.svg";
import left from "../assets/icons_arrow-left.svg";
import right from "../assets/icons arrow-right.svg";
import ellipse from "../assets/Ellipse 16.svg";
import fillstar from "../assets/fillstar.svg";
import emptystar from "../assets/emptystar.svg";
import Button from "../components/Button";
// import Card from "./Card";
import { useNavigate } from "react-router-dom";
import "./Sales.css";
import axios from "axios";
import Loader from "../components/Loader";

const Sales = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [salePrices, setSalePrices] = useState({});
  const navigate = useNavigate();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleItems = response.slice(startIndex, endIndex);

  const totalPages = Math.ceil(response.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
  const handleClick = () => {
    navigate("/allproducts");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://fakestoreapi.com/products");
        // console.log("=======>", result);
        setResponse(result.data);
      } catch (error) {
        if (error.response) {
          setError(`Server Error: ${error.response.status}`);
        } else if (error.request) {
          setError("Network Error: Please check your internet connection");
        } else {
          setError("Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToSingleProduct = (item) => {
    navigate(`/Product/${item.id}`, { state: { productData: item } });
  };
  const calculateRemainingTime = () => {
    const currentTime = new Date();
    const endTime = new Date("2024-04-30T03:23:55Z");
    const timeDifference = endTime - currentTime;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setRemainingTime({ days, hours, minutes, seconds });
  };
  useEffect(() => {
    // Calculate remaining time on component mount
    calculateRemainingTime();

    // Update remaining time every second
    const intervalId = setInterval(calculateRemainingTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Calculate sale prices for each item
    const newSalePrices = {};
    response.forEach((item) => {
      const { id, price } = item;
      const originalPrice = price;
      const discountPercentage = Math.floor(Math.random() * (25 - 10 + 1) + 10);
      const salePrice =
        originalPrice - (originalPrice * discountPercentage) / 100;
      newSalePrices[id] = salePrice.toFixed(2);
    });

    setSalePrices(newSalePrices);
  }, [response]);
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="row sales-wrapper">
            <div className="test d-flex justify-content-between">
              <div className="test1">
                <div className="col-md-12 mx-3 sale-first">
                  <div>
                    <img src={line} alt="" className="small-line" />
                  </div>
                  <div>
                    <p className="sale-text">Today's</p>
                  </div>
                </div>
                <div className="time-wrapper d-md-flex d-sm-block gap-5 align-items-end mx-3">
                  <div className="time">
                    <span className="span-text">Flash Sales</span>
                  </div>
                  <div className="time">
                    <div className="time-block d-flex border">
                      <span className="time-heading">Days</span>
                      <span className="time-heading">Hours</span>
                      <span className="time-heading">Minutes</span>
                      <span className="time-heading">Seconds</span>
                    </div>
                    <div className="time-block1 d-flex gap-3">
                      {/* <span className="number">03</span>
                  <span className="divider">:</span>
                  <span className="number">23</span>
                  <span className="divider">:</span>
                  <span className="number">55</span>
                  <span className="divider">:</span>
                  <span className="number">06</span> */}
                      <span className="number">
                        {remainingTime && remainingTime.days}
                      </span>
                      <span className="divider">:</span>
                      <span className="number">
                        {remainingTime && remainingTime.hours}
                      </span>
                      <span className="divider">:</span>
                      <span className="number">
                        {remainingTime && remainingTime.minutes}
                      </span>
                      <span className="divider">:</span>
                      <span className="number">
                        {remainingTime && remainingTime.seconds}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex pt-3 align-items-end">
                <img src={ellipse} alt="" />
                <img
                  src={left}
                  alt="left"
                  className="leftarrow"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                />
                <img src={ellipse} alt="" />
                <img
                  src={right}
                  alt="right"
                  className="rightarrow"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                />
              </div>
            </div>
            <div className="row mt-5">
              {loading && <Loader />}
              {error && <div className="error-message">{error}</div>}
              {visibleItems.map((item) => {
                const { id, title, image, price } = item;
                const originalPrice = price;

                const salePrice = salePrices[id] || originalPrice;

                return (
                  <div
                    className="col-lg-3 col-md-3 col-sm-6 col-12  border img-block"
                    key={id}
                    onClick={() => navigateToSingleProduct(item)}
                  >
                    <div>
                      <div className="text-center mt-2">
                        <img
                          src={image}
                          alt={title}
                          className="img-fluid sale-imgs mb-2 "
                        />
                      </div>
                      <div className="mt-2">
                        <p>{title.substring(0, 20)}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-danger text-decoration-line-through ">
                          ${originalPrice.toFixed(2)}
                        </p>
                        <p className="text-primary">
                          ${(price * 0.9).toFixed(2)}
                        </p>
                      </div>
                      <div className="mt-2 mb-2">
                        <button className="btn btn-outline-info">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-5 mb-5 d-flex justify-content-center">
            <Button
              label={"View All Products"}
              className="custom-button"
              onClick={handleClick}
            />
          </div>
          <div className="horizontal-line"></div>
        </div>
      </div>
    </>
  );
};

export default Sales;
