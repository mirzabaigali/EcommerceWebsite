import React from "react";
import heart from "../assets/heart small.svg";
import view from "../assets/view.svg";
import fillstar from "../assets/fillstar.svg";
import emptystar from "../assets/emptystar.svg";
const Card = ({
  ind,
  discountPercentage,
  itemName,
  salePrice,
  originalPrice,
  ratings,
  image,
}) => {
  const renderStars = (rating) => {
    const filledStars = Math.round(parseFloat(rating));
    const emptyStars = 5 - filledStars;

    const starsArray = [];
    for (let i = 0; i < filledStars; i++) {
      starsArray.push(<img key={i} src={fillstar} alt="filled star" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      starsArray.push(
        <img key={filledStars + i} src={emptystar} alt="empty star" />
      );
    }
    return starsArray;
  };

  return (
    <>
      <div className="col-auto col-sm-6 col-md-6 col-lg-3">
        <div className="card sale-card" key={ind}>
          <div className="discount-box">
            <span className="discount-percentage">-{discountPercentage}%</span>
          </div>
          <div className="sale-cardbody">
            <img src={image} alt={itemName} className="img-fluid test-img" />
            <div className="d-flex flex-column gap-2 align-items-end  overlay-icons ">
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
            <p className="sale-rating">{ratings && renderStars(ratings)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
