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
import image1 from "../assets/signup images/image1.jpg";
import image2 from "../assets/signup images/image2.jpg";
import image3 from "../assets/signup images/image3.jpg";
import image4 from "../assets/signup images/image4.jpg";
import image5 from "../assets/signup images/image5.jpg";
import { useAuth } from "../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../components/Api";
import Loader2 from "../components/Loader2";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const { token, login, swap, setSwap } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");
  const toggleModal = () => {
    setErrors({});
    setForgetEmail("");
    setSuccess(false);
    setShowModal(!showModal);
  };
  console.log("===>signup", token);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
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
    speed: 4000,
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
    setSwap(!swap);
    // login(!token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      try {
        setLoading(true);
        const result = await postData("/login", {
          email: formData.email,
          password: formData.password,
        });
        toast.success("Login Successful");
        const { token, name } = result;
        login(token);
        localStorage.setItem("authToken", token);
        localStorage.setItem("userName", name);
        navigate("/");
      } catch (error) {
        toast.error("Invalid Credentials");
        console.error("Error login:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleCreateLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const result = await postData("/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        console.log(result);
        toast.success("Sign Up Successful");
        const { token, name } = result;
        localStorage.setItem("userName", name);

        console.log(result);

        login(token);
        localStorage.setItem("authToken", token);
        navigate("/");
      } catch (error) {
        toast.error("Sign up failed");
        console.error("Error signing up:", error);
      } finally {
        setLoading(false);
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
    // login(!!token);
  }, [token, login]);

  const [success, setSuccess] = useState(false);
  //handlesubmit for forgetpassword
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading1(true);
    try {
      const response = await axios.post(
        // "http://localhost:8000/api/auth/forgot-password",
        "https://ecommerce-backend-1-qzcn.onrender.com/api/auth/forgot-password",
        {
          email: forgetEmail, // Use forgetEmail instead of formData.email
        }
      );

      // Handle successful response
      setLoading1(false);
      setSuccess(true);
      console.log(response.data);
    } catch (error) {
      setLoading1(false);
      setErrors({
        message:
          error.response.data.message === "User not found"
            ? "User not found. Please check your email and try again."
            : error.response.data.message,
      });

      console.error("Error:", error);
    }
  };

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
              <div>
                <LazyLoadImage
                  effect="blur"
                  src={image5}
                  alt="img"
                  className="img-fluid"
                  loading="lazy"
                />
              </div>
            </Slider>
          </div>
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            {swap ? (
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
                      label={loading ? <Loader2 /> : "Login"}
                      className="custom-button2"
                      onClick={handleLogin}
                      disabled={loading}
                    />
                  </div>
                  <div className="mt-5 forget" onClick={toggleModal}>
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
                      label={loading ? <Loader2 /> : "Create Account"}
                      className="custom-button"
                      onClick={handleCreateLogin}
                      disabled={loading}
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
      <Modal show={showModal} onHide={toggleModal}>
        <div className="text-center">
          <h3>Reset Password</h3>
          <p className="text-muted">Enter your email to reset your password</p>
        </div>
        <div className="form-group">
          <label htmlFor="emailp" className="ms-4">
            Email
          </label>
          <input
            type="email"
            name="emailp"
            id="emailp"
            placeholder="m@example.com"
            required
            value={forgetEmail}
            onChange={(e) => setForgetEmail(e.target.value)}
            className="form-control mt-2 custom-input"
            style={{ width: "90%", marginLeft: "5%" }}
          />
        </div>
        <div className="text-center">
          <button
            className="btn btn-dark mt-4 "
            style={{ width: "90%" }}
            onClick={handleSubmit}
          >
            {loading1 ? 'Sending...' : 'Send Reset Email'}
          </button>
          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger mt-2">
              {Object.values(errors).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          {success && (
            <div className="alert alert-success mt-2">
              Reset email sent successfully!
            </div>
          )}
        </div>
        <div className="mt-5 mb-3 ms-4">
          <Link to="/signup" onClick={toggleModal}>
            Remembered your password? Login
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
