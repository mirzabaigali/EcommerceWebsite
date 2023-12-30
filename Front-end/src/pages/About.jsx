import React from "react";
import { useSpring, animated } from "react-spring";
import EcomHomePage from "./EcomHomePage";
import Breadcrumb from "../components/Breadcrumb";
import african from "../assets/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1.png";
import blackcircle from "../assets/About/blackcircle.svg";
import whitecircle from "../assets/About/whitecircle.svg";
import home from "../assets/About/home.svg";
import dollar from "../assets/About/$sign.svg";
import shopping from "../assets/About/Icon-Shopping bag.svg";
import monrybag from "../assets/About/moneybag.svg";
import image1 from "../assets/About/image 46.png";
import image2 from "../assets/About/image 47.png";
import image3 from "../assets/About/image 51.png";
import van from "../assets/About/icon-delivery.svg";
import cxservice from "../assets/About/Icon-Customer service.svg";
import shield from "../assets/About/shield-tick.svg";
import fb from "../assets/About/fb.svg";
import ins from "../assets/About/ins.svg";
import lin from "../assets/About/lin.svg";
import Skeleton from "react-loading-skeleton";
import "./About.css";
import Footer from "../components/Footer";

const About = () => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const breadcrumbItems = [
    { text: "Home", link: "/" },
    { text: "About" },
  ];
  const aboutFeatures = [
    {
      img1: blackcircle,
      img2: home,
      followers: 10.5,
      text: "Sallers active our site",
    },
    {
      img1: whitecircle,
      img2: dollar,
      followers: 33,
      text: "Mopnthly Produduct Sale",
    },
    {
      img1: blackcircle,
      img2: shopping,
      followers: 45.5,
      text: "Customer active in our site",
    },
    {
      img1: blackcircle,
      img2: monrybag,
      followers: 25,
      text: "Anual gross sale in our site",
    },
  ];
  const aboutParticipants = [
    {
      ima: image1,
      name: "Tom Cruise",
      designation: "Founder & Chairman",
    },
    {
      ima: image3,
      name: "Emma Watson",
      designation: "Managing Director",
    },
    {
      ima: image2,
      name: "Will Smith",
      designation: "Product Designer",
    },
  ];

  const AnimatedNumber = ({ value }) => {
    const { number } = useSpring({
      from: { number: 0 },
      to: { number: value },
      config: { duration: 5000 },
    });

    return (
      <animated.p className="followers-para">
        {number.to((val) =>
          val % 1 === 0 ? `${val.toFixed(0)}K` : `${val.toFixed(1)}K`
        )}
      </animated.p>
    );
  };

  return (
    <>
      <header>
        <EcomHomePage />
      </header>
      <main>
        <div className="container">
          <div className="mt-5">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6  d-flex justify-content-center align-items-center">
              <div className="mt-5">
                <div>
                  <p className="service-heading">Our Story</p>
                </div>
                <div className="abtsecond-box">
                  <p className="para1">
                    Launced in 2015, Exclusive is South Asia’s premier online
                    shopping makterplace with an active presense in Bangladesh.
                    Supported by wide range of tailored marketing, data and
                    service solutions, Exclusive has 10,500 sallers and 300
                    brands and serves 3 millioons customers across the region.{" "}
                  </p>
                </div>
                <div className="abtthird-box">
                  <p className="para1">
                    Exclusive has more than 1 Million products to offer, growing
                    at a very fast. Exclusive offers a diverse assotment in
                    categories ranging from consumer.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 right-img">
              <img
                src={african}
                alt="img"
                className="img-fluid"
                onLoad={handleImageLoad}
              />
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            {aboutFeatures.map((item, ind) => {
              return (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-12 g-sm-1"
                  key={ind}
                >
                  <div className="followers-wrapper d-flex flex-column">
                    <img src={item.img1} alt="circle" />
                    <img src={item.img2} alt="img" className="home-img" />
                    <AnimatedNumber value={item.followers} />
                    <p className="followers-box">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            {aboutParticipants.map((item, ind) => {
              return (
                <div className="col-lg-4 col-md-6 col-sm-6 " key={ind}>
                  <div className="participants">
                    <div className="participants1">
                      <img src={item.ima} alt="img" />
                    </div>
                    <div>
                      <span className="part-name">{item.name}</span>
                      <br />
                      <span className="designation">{item.designation}</span>
                      <div className="social-icons mt-2">
                        <img src={fb} alt="" />
                        <img src={ins} alt="" />
                        <img src={lin} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
                <span className="para3 mb-3">
                  Friendly 24/7 customer support
                </span>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={blackcircle} alt="" />
                <img src={shield} alt="" className="img-services" />
                <span className="para2">MONEY BACK GUARANTEE</span>
                <span className="para3 mb-3">
                  We return money within 30 days
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-5">
        <Footer />
      </footer>
    </>
  );
};

export default About;
