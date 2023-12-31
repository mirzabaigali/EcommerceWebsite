import React from "react";
import heart from "../assets/heart small.svg";
import view from "../assets/view.svg";
const Card = ({ind,discountPercentage,itemName,salePrice,originalPrice,ratings,image}) => {
  return (
    <>
      <div className="col-auto col-sm-6 col-md-6 col-lg-3">
        <div className="card sale-card" key={ind}>
          <div className="discount-box">
            <span className="discount-percentage">-{discountPercentage}%</span>
          </div>
          <div className="sale-cardbody">
            <img src="" alt="" />
            <div className="d-flex flex-column gap-2 align-items-end">
              <img src={heart} alt="" className="heart" />
              <img src={view} alt="" className="heart" />
            </div>
          </div>
          <div style={{ marginTop: "16px" }}>
            <p className="sale-itemName">{itemName}</p>
            <div
              className="d-flex justify-content-between"
              style={{ width: "150px" }}
            >
              <p className="sale-price">{salePrice}</p>{" "}
              <span className="sale-price1 text-decoration-line-through">
                {originalPrice}
              </span>
            </div>
            <p className="sale-rating">{ratings}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
