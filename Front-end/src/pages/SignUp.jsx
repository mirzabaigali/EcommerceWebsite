import React, { useContext, useEffect, useState } from "react";
import "./SignUp.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import GoogleIcon from "../assets/Icon-Google.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/HeroImg.jpg";
import image2 from "../assets/HeroImage4.jpg";
import image3 from "../assets/HeroImg3.jpg";
import image4 from "../assets/ecomImg.jpg";
import { useAuth } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { postData } from "../components/Api";
const Login = () => {
  const { token, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const sliderSettings = {
    lazyLoad: true,
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
    login(!token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      try {
        const result = await postData("/login", {
          email: formData.email,
          password: formData.password,
        });
        console.log(result);
        const { token } = result;
        login(token);
        localStorage.setItem("authToken", token);
        navigate("/");
      } catch (error) {
        console.error("Error login:", error);
      }
    }
  };

  const handleCreateLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await postData("/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        console.log(result);
        const { token } = result;
        login(token);
        localStorage.setItem("authToken", token);
        navigate("/");
      } catch (error) {
        console.error("Error signing up:", error);
      }
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name cannot be empty";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email cannot be empty";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password cannot be empty";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const validateLoginForm = () => {
    const newErrors = {};

    ["email", "password"].forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } cannot be empty`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    login(!!token);
  }, [token, login]);

  return (
    <div className="login-wrapper">
      <Navbar />
      <div className="container-fluid mb-2">
        <div className="row">
          <div className="col-md-7 left">
            <Slider {...sliderSettings} className="slide">
              <div>
                <LazyLoadImage
                  effect="blur"
                  src={image1}
                  alt="img"
                  className="img-fluid"
                  loading="lazy"
                />
              </div>
              <div>
                <LazyLoadImage
                  effect="blur"
                  src={image2}
                  alt="img"
                  className="img-fluid"
                  loading="lazy"
                />
              </div>
              <div>
                <LazyLoadImage
                  effect="blur"
                  src={image3}
                  alt="img"
                  className="img-fluid"
                  loading="lazy"
                />
              </div>
              <div>
                <LazyLoadImage
                  effect="blur"
                  src={image4}
                  alt="img"
                  className="img-fluid"
                  loading="lazy"
                />
              </div>
            </Slider>
          </div>
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            {token ? (
              <form action="" className="form-box">
                <h3 className="text1">Log in to Exclusive</h3>
                <h6 className="text2">Enter your details below</h6>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Or Phone Number"
                  className={`input-field-login input2 ${
                    errors.email && "input-error"
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}

                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className={`input-field-login input2 ${
                      errors.password && "input-error"
                    }`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="error-message">{errors.password}</p>
                  )}
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
                    className={`input-field-login ${
                      errors.name && "input-error"
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="error-message">{errors.name}</p>
                  )}

                  <br />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Or Phone Number"
                    className={`input-field-login input2 ${
                      errors.email && "input-error"
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="error-message">{errors.email}</p>
                  )}

                  <div className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      className={`input-field-login input2 ${
                        errors.password && "input-error"
                      }`}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="error-message">{errors.password}</p>
                    )}

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
                      onClick={handleCreateLogin}
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
