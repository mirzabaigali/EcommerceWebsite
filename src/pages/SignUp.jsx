import React, { useContext, useState } from "react";
import "./SignUp.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import GoogleIcon from "../assets/Icon-Google.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/HeroImg.jpg";
import image2 from "../assets/HeroImage4.jpg";
import image3 from "../assets/HeroImg3.jpg";
import image4 from "../assets/ecomImg.jpg";
import { AuthContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { loginOnly, setLoginOnly } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLoginClick = (e) => {
    e.preventDefault();
    setLoginOnly(true);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/MainPage");
  };

  return (
    <div className="login-wrapper">
      <Navbar />
      <div className="container-fluid mb-2">
        <div className="row">
          <div className="col-md-7 left">
            <Slider {...sliderSettings} className="slide">
              <div>
                <img
                  src={image1}
                  alt="img"
                  className="img-fluid"
                  loading="lazy"
                />
              </div>
              <div>
                <img
                  src={image4}
                  alt="img"
                  className="img-fluid"
                  loading="lazy"
                />
              </div>
              <div>
                <img
                  src={image2}
                  alt="img"
                  className="img-fluid"
                  loading="lazy"
                />
              </div>
              <div>
                <img
                  src={image3}
                  alt="img"
                  className="img-fluid"
                  loading="lazy"
                />
              </div>
            </Slider>
          </div>
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            {loginOnly ? (
              // Render only email and password fields
              <form action="" className="form-box">
                <h3 className="text1">Log in to Exclusive</h3>
                <h6 className="text2">Enter your details below</h6>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Or Phone Number"
                  className="input-field-login input2"
                />
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="input-field-login input2"
                  />
                  <span className="eye">
                    {showPassword ? (
                      <IoIosEyeOff onClick={togglePasswordVisibility} />
                    ) : (
                      <IoIosEye onClick={togglePasswordVisibility} />
                    )}
                  </span>
                </div>
                <div className="input3-create">
                  <div>
                    <Button
                      label={"Login"}
                      className="custom-button2"
                      onClick={handleLogin}
                    />
                  </div>
                  <div className="mt-5 forget">
                    <p>Forget Password?</p>
                  </div>
                </div>
              </form>
            ) : (
              <div>
                <h3>Create an account</h3>
                <p>Enter your details below</p>
                <form action="" className="form-box">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="input-field-login"
                  />
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Or Phone Number"
                    className="input-field-login input2"
                  />
                  <div className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="input-field-login input2"
                    />
                    <span className="eye">
                      {showPassword ? (
                        <IoIosEyeOff onClick={togglePasswordVisibility} />
                      ) : (
                        <IoIosEye onClick={togglePasswordVisibility} />
                      )}
                    </span>
                  </div>

                  <div className="input2">
                    <Button
                      label={"Create Account"}
                      className="custom-button"
                    />
                  </div>
                  <div className="input2-create">
                    <Button
                      imgSrc={GoogleIcon}
                      label={"Sign Up With Google"}
                      className="custom-button1"
                    />
                  </div>
                  <div className="input2-create d-flex justify-content-between">
                    <div>
                      <p>Already have account?</p>
                    </div>
                    <div>
                      <button className="loginBtn" onClick={handleLoginClick}>
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
