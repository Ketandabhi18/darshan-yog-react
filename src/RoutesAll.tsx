import React from "react";
import { Route, Routes } from "react-router-dom";
import HeaderComponent from "./Components/HeaderComponent";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ProgramSchedule from "./pages/ProgramSchedule";
import ViewDetails from "./pages/ViewDetails";

const RoutesAll = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/program-schedule" element={<ProgramSchedule />} />
        <Route path="/:id" element={<ViewDetails />} />
      </Routes>
    </>
  );
};

export default RoutesAll;
