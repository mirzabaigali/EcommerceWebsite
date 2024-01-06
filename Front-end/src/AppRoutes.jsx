import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import SingleProductPage from "./pages/SingleProduct";
import { useAuth } from "./Context/AppContext";

const AppRoutes = () => {
  const { token } = useAuth();

  const PrivateRoute = ({ element, ...props }) => {
    return token ? (
      <Route {...props} element={element} />
    ) : (
      <Navigate to="/signup" />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <PrivateRoute path="/wishlist" element={<Wishlist />} />
      <PrivateRoute path="/cart" element={<Cart />} />
      <PrivateRoute path="/checkout" element={<Checkout />} />
      <PrivateRoute path="/account" element={<Account />} />
      <PrivateRoute path="/product" element={<SingleProductPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
