import React, { useEffect, useState } from "react";
import line from "../assets/Rectangleline.svg";
import left from "../assets/icons_arrow-left.svg";
import right from "../assets/icons arrow-right.svg";
import ellipse from "../assets/Ellipse 16.svg";
import fillstar from "../assets/fillstar.svg";
import emptystar from "../assets/emptystar.svg";
import Button from "../components/Button";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import "./Sales.css";
import axios from "axios";
import Loader from "../components/Loader";
const Sales = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const saleData = async () => {
      try {
        const sale = await axios.get("https://fakestoreapi.com/products");
        setResponse(sale.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    saleData();
  }, []);

  return (
    <>
      <div className="col-md-12 sales-wrapper">
        <div className="test d-flex justify-content-between">
          <div className="test1">
            <div className="sale-first">
              <div>
                <img src={line} alt="" className="small-line" />
              </div>
              <div>
                <p className="sale-text">Today's</p>
              </div>
            </div>
            <div className="time-wrapper d-flex gap-5 align-items-end">
              <div className="time">
                <span className="span-text">Flash Sales</span>
              </div>
              <div className="time">
                <div className="time-block d-flex">
                  <span className="time-heading">Days</span>
                  <span className="time-heading">Hours</span>
                  <span className="time-heading">Minutes</span>
                  <span className="time-heading">Seconds</span>
                </div>
                <div className="time-block1 d-flex gap-3">
                  <span className="number">03</span>
                  <span className="divider">:</span>
                  <span className="number">23</span>
                  <span className="divider">:</span>
                  <span className="number">55</span>
                  <span className="divider">:</span>
                  <span className="number">06</span>
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

          {visibleItems.map((item) => {
            const {
              id,
              title,
              image,
              rating: { rate },
              price,
            } = item;
            const discountPercentage = Math.floor(
              Math.random() * (25 - 10 + 1) + 10
            );

            // Calculate sale price
            const originalPrice = price;
            const salePrice =
              originalPrice - (originalPrice * discountPercentage) / 100;
            //ratings
            const roundedRating = Math.round(parseFloat(rate));

            return (
              <>
                <Card
                  ind={id}
                  originalPrice={price}
                  itemName={title.substring(0, 20)}
                  ratings={roundedRating}
                  salePrice={salePrice.toFixed(2)}
                  discountPercentage={discountPercentage}
                  image={image}
                />
              </>
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
    </>
  );
};

export default Sales;
