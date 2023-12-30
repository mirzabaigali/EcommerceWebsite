import React, { useState } from "react";
import line from "../assets/Rectangleline.svg";
import left from "../assets/icons_arrow-left.svg";
import right from "../assets/icons arrow-right.svg";
import ellipse from "../assets/Ellipse 16.svg";
import heart from "../assets/heart small.svg";
import view from "../assets/view.svg";
import saleData from "../saleData";

import "./Sales.css";
import Button from "../components/Button";
import Card from "./Card";
const Sales = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleItems = saleData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(saleData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
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
          {visibleItems.map((item, ind) => {
            const {
              originalPrice,
              itemName,
              image,
              ratings,
              salePrice,
              discountPercentage,
            } = item;
            return (
              // <div className="col-lg-3 col-md-6 col-sm-6">
              //   <div className="card sale-card" key={ind}>
              //     <div className="discount-box">
              //       <span className="discount-percentage">
              //         -{discountPercentage}%
              //       </span>
              //     </div>
              //     <div className="sale-cardbody">
              //       <img src="" alt="" />
              //       <div className="d-flex flex-column gap-2 align-items-end">
              //         <img src={heart} alt="" className="heart" />
              //         <img src={view} alt="" className="heart" />
              //       </div>
              //     </div>
              //     <div style={{ marginTop: "16px" }}>
              //       <p className="sale-itemName">{itemName}</p>
              //       <div
              //         className="d-flex justify-content-between"
              //         style={{ width: "150px" }}
              //       >
              //         <p className="sale-price">{salePrice}</p>{" "}
              //         <span className="sale-price1 text-decoration-line-through">
              //           {originalPrice}
              //         </span>
              //       </div>
              //       <p className="sale-rating">{ratings}</p>
              //     </div>
              //   </div>
              // </div>
              <>
                <Card
                  originalPrice={originalPrice}
                  itemName={itemName}
                  ratings={ratings}
                  salePrice={salePrice}
                  discountPercentage={discountPercentage}
                  image={image}
                />
              </>
            );
          })}
        </div>
      </div>
      <div className="mt-5 mb-5 d-flex justify-content-center">
        <Button label={"View All Products"} className="custom-button" />
      </div>
      <div className="horizontal-line"></div>
    </>
  );
};

export default Sales;
