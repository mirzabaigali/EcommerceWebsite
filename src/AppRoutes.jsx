import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import EcomHomePage from "./pages/EcomHomePage";
import Main from "./pages/Main";
// import About from './About';
// import Contact from './Contact';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/EcomHomePage" element={<EcomHomePage />} />
        <Route path="/MainPage" element={<Main />} />

        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
