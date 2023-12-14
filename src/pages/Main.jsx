import React from "react";
import EcomHomePage from "../pages/EcomHomePage";
import Footer from "../components/Footer";
import DropDown from "../assets/DropDown1.svg";
import appleLogo from "../assets/apple.png";
import "./Main.css";
import { Carousel } from "react-bootstrap";
import Sales from "./Sales";
const Main = () => {
  const slides = [
    {
      id: 1,
      name: "Iphone 15 Pro",
      discount: "Up to 10% off Voucher",
      imageUrl:
        "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/tile/Apple-iPhone-15-Pro-lineup-hero-230912.jpg.og.jpg?202311010242",
    },
    {
      id: 2,
      name: "Gaming Computers",
      discount: "Up to 20% off Voucher",
      imageUrl:
        "https://png.pngtree.com/thumb_back/fw800/background/20230714/pngtree-gaming-setup-with-rgb-lights-and-3d-rendering-dark-room-desktop-image_3857852.jpg",
    },
    {
      id: 3,
      name: "Smart Watches",
      discount: "Up to 30% off Voucher",
      imageUrl:
        "https://c4.wallpaperflare.com/wallpaper/1022/414/539/5c1ca99567493-wallpaper-preview.jpg",
    },
    {
      id: 4,
      name: "Headphones",
      discount: "Up to 15% off Voucher",
      imageUrl: "https://wallpaperaccess.com/full/2068799.jpg",
    },
    {
      id: 5,
      name: "Gaming controllers",
      discount: "Up to 25% off Voucher",
      imageUrl:
        "https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_640.jpg",
    },
  ];
  return (
    <>
      <header>
        <EcomHomePage />
      </header>
      <div className="container">
        <div className="row">
          <div className="col-sm-4 main-left">
            <div>
              <ul className="main-list">
                <li>
                  Woman’s Fashion
                  <span className="main-dropdown">
                    <img src={DropDown} alt="" />
                  </span>
                </li>
                <li>
                  Men’s Fashion
                  <span className="main-dropdown1">
                    <img src={DropDown} alt="" />
                  </span>
                </li>
                <li>Electronics</li>
                <li>Home & Lifestyle</li>
                <li>Medicine</li>
                <li>Sports & Outdoor</li>
                <li>Baby’s & Toys</li>
                <li>Groceries & Pets</li>
                <li>Health & Beauty</li>
              </ul>
            </div>
            <div className="vertical-line"></div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-8 main-right">
            <Carousel controls={false}>
              {slides.map((slide) => (
                <Carousel.Item key={slide.id}>
                  <div
                    className="carousel-image imsgr"
                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                  >
                    <div className="carousel-content">
                      <h3
                        className={`${
                          slide.id === 3
                            ? "carosol-textid3 mx-2"
                            : "carosol-text mx-2"
                        }`}
                      >
                        {slide.name}
                      </h3>

                      <p
                        className={`${
                          slide.id === 3
                            ? "carosol-textid3 mx-2"
                            : "discount mx-2"
                        }`}
                      >{`${slide.discount} Discount`}</p>
                      <button className="btn btn-outline-primary mx-2">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <Sales />
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Main;
