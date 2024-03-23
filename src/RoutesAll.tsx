import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ProgramSchedule from "./pages/ProgramSchedule";
import ViewDetails from "./pages/ViewDetails";
import ContactUs from "./pages/ContactUs";
import UpdateUser from "./pages/UpdateUser";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetail";
import UpdatePassword from "./pages/UpdatePassword";

const RoutesAll = () => {
  return (
    <>
      <div style={{}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/program-schedule" element={<ProgramSchedule />} />
          <Route path="/:id" element={<ViewDetails />} />
          <Route path="/event-detail" element={<EventDetailPage />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Routes>
      </div>
    </>
  );
};

export default RoutesAll;
