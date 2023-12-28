import React, { useState } from "react";
import line from "../assets/Rectangleline.svg";
import "./Categories.css";
import left from "../assets/icons_arrow-left.svg";
import right from "../assets/icons arrow-right.svg";
import ellipse from "../assets/Ellipse 16.svg";
import phones from "../assets/category/Category-CellPhone.svg";
import computers from "../assets/category/Category-Computer.svg";
import cameras from "../assets/category/Category-Camera.svg";
import headphones from "../assets/category/Category-Headphone.svg";
import gamings from "../assets/category/Category-Gamepad.svg";
const Categories = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const brands = [
    { img: phones, text: "Phones" },
    { img: computers, text: "Computers" },
    { img: cameras, text: "Camera" },
    { img: headphones, text: "HeadPhones" },
    { img: gamings, text: "Gaming" },
  ];

  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;

  //   const visibleItems = saleData.slice(startIndex, endIndex);

  //   const totalPages = Math.ceil(saleData.length / itemsPerPage);

  const handleNextPage = () => {
    // setCurrentPage(
    //   (prevPage) =>
    //   prevPage < totalPages ? prevPage + 1 : prevPage
    // );
  };

  const handlePrevPage = () => {
    // setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
  return (
    <div className="category-wrapper">
      <div className="category-name d-flex align-items-baseline">
        <div>
          <img src={line} alt="" className="small-line" />
        </div>
        <div className="ms-2">
          <p className="sale-text">Categories</p>
        </div>
      </div>
      <div className="Brand-wrapper d-flex gap-5 align-items-end justify-content-between">
        <div className="brand-category">
          <span className="brand-name">Browse By Category</span>
        </div>
        <div className="d-flex pt-3 align-items-end">
          <img src={ellipse} alt="" />
          <img
            src={left}
            alt="left"
            className="leftarrow"
            onClick={handlePrevPage}
            // disabled={currentPage === 1}
          />
          <img src={ellipse} alt="" />
          <img
            src={right}
            alt="right"
            className="rightarrow"
            onClick={handleNextPage}
            // disabled={currentPage === totalPages}
          />
        </div>
      </div>
      <div className="row mt-5 mb-5 gap-2  d-flex justify-content-center">
        {/* <div className="col d-flex justify-content-evenly align-items-baseline">
          {brands.map((item, ind) => {
            return (
              <div className="box-wrapper-cate ">
                <img src={item.img} alt="" />
                {item.text ===  "Computers" || item.text === "Headphones" ? (
                  <div className="ms-5 border">
                    <p>hello</p>
                  </div>
                ) : (
                  <p>{item.text}</p>
                )}
              </div>
            );
          })}
        </div> */}
        {brands.map((item, ind) => {
          return (
            <div
              className="col-md  col-sm-5 col-6 d-flex  align-items-baseline"
              key={ind}
            >
              <div className="box-wrapper-cate">
                <img src={item.img} alt="" />
                {item.text === "Computers" || item.text === "HeadPhones" ? (
                  <div
                    className={`${
                      item.text === "Computers" || item.text === "HeadPhones"
                        ? "hello-block"
                        : ""
                    }`}
                  >
                    <p>{item.text}</p>
                  </div>
                ) : (
                  <p>{item.text}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="horizontal-line"></div>
    </div>
  );
};

export default Categories;
