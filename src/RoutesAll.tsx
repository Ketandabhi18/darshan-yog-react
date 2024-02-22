import React from "react";
import { Route, Routes } from "react-router-dom";
import HeaderComponent from "./Components/HeaderComponent";
import Login from "./pages/Login";

const RoutesAll = () => {
  return (
    <>
      {/* <HeaderComponent /> */}
      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route path="/" element={<HeaderComponent />} />
      </Routes>
    </>
  );
};

export default RoutesAll;
