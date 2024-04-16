import React from "react";
import line from "../assets/Rectangleline.svg";
import Button from "../components/Button";
import "./BestSelling.css";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
const BestSelling = () => {
  const Bestselling = [
    {
      id: 1,
      image: "https://example.com/item1.jpg",
      itemName: "Product 1",
      salePrice: 25.99,
      originalPrice: 39.99,
      ratings: 4.5,
      discountPercentage: 35,
    },
    {
      id: 2,
      image: "https://example.com/item2.jpg",
      itemName: "Product 2",
      salePrice: 19.99,
      originalPrice: 29.99,
      ratings: 4.2,
      discountPercentage: 33,
    },
    {
      id: 3,
      image: "https://example.com/item3.jpg",
      itemName: "Product 3",
      salePrice: 14.99,
      originalPrice: 24.99,
      ratings: 4.0,
      discountPercentage: 40,
    },
    {
      id: 4,
      image: "https://example.com/item4.jpg",
      itemName: "Product 4",
      salePrice: 34.99,
      originalPrice: 49.99,
      ratings: 4.8,
      discountPercentage: 30,
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="bestselling-wrapper">
      <div className="d-flex align-items-baseline">
        <div>
          <img src={line} alt="" className="small-line" />
        </div>
        <div className="ms-2">
          <p className="sale-text">This Month</p>
        </div>
      </div>
      <div className="Brand-wrapper d-flex gap-5 align-items-end justify-content-between">
        <div className="brand-category">
          <span className="brand-name">Best Selling Products</span>
        </div>
        <div>
          <Button
            label={"View All"}
            className={"button-best"}
            onClick={() => navigate("/allproducts")}
          />
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          {Bestselling.map((item, ind) => {
            const {
              originalPrice,
              itemName,
              image,
              ratings,
              salePrice,
              discountPercentage,
            } = item;
            return (
              <Card
                originalPrice={originalPrice}
                itemName={itemName}
                ratings={ratings}
                salePrice={salePrice}
                discountPercentage={discountPercentage}
                image={image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
