import React, { useEffect, useState } from "react";
import EcomHomePage from "../pages/EcomHomePage";
import Footer from "../components/Footer";
import "./Main.css";
import { Carousel } from "react-bootstrap";
import Sales from "./Sales";
import Categories from "./Categories";
import BestSelling from "./BestSelling";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bannerImage1 from "../assets/new images/banner1.png";
import bannerImage2 from "../assets/new images/Frame 600.png";
import NewArrival from "./NewArrival";
const Main = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const slides = [
    {
      id: 1,
      // name: "Iphone 15 Pro",
      // discount: "Up to 10% off Voucher",
      imageUrl: bannerImage1,
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
  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategoryList(response?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleCategoryClick = (category) => {
    console.log(category);
    setSelectedCategory(category);
    navigate(`/selectedcategory`, { state: category });
  };
  return (
    <>
      <header>
        <EcomHomePage />
      </header>
      <div className="container">
        <div className="row">
          <div className="col-sm-4 main-left">
            <div className="col-sm-5 ">
              <ul className="main-list">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <div class="spinner"></div>
                  </div>
                ) : (
                  categoryList.slice(0, 10).map((item, index) => (
                    <li
                      key={item.id || index}
                      className={hoveredCategory === item.id ? "zoom-in" : ""}
                      onMouseEnter={() => setHoveredCategory(item.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      onClick={() => handleCategoryClick(item)}
                    >
                      {item}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="col-sm-5 ">
              <ul className="main-list">
                {loading ? (
                  // <div class="spinner"></div>
                  <></>
                ) : (
                  categoryList.slice(10, 20).map((item, index) => (
                    <li
                      key={item.id || index}
                      className={hoveredCategory === item.id ? "zoom-in" : ""}
                      onMouseEnter={() => setHoveredCategory(item.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      onClick={() => handleCategoryClick(item)}
                    >
                      {item}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="vertical-line"></div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-8 main-right">
            {loading ? (
              <div className="spinner spinner-center"></div>
            ) : (
              <Carousel controls={false}>
                {/* {slides.map((slide) => (
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
                ))} */}
                {slides.map((slide) => (
                  <Carousel.Item key={slide.id}>
                    <div
                      className="carousel-image imsgr"
                      style={{ backgroundImage: `url(${slide.imageUrl})` }}
                    >
                      {slide.id !== 1 ? ( // Display text and button for slides other than the one with id 1
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
                      ) : null}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <Sales />
        </div>
        <div className="row">
          <Categories />
        </div>
        <div className="row">
          <BestSelling />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <img src={bannerImage2} alt="img" className="img-fluid" />
            </div>
          </div>
        </div>
        <div className="row">
          <NewArrival />
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Main;
