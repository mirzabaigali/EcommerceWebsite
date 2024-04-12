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
import AllProducts from "./pages/AllProducts";
import SelectedCategory from "./pages/SelectedCategory";

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/account" element={<Account />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/allproducts" element={<AllProducts />} />
      <Route path="/selectedcategory" element={<SelectedCategory />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
