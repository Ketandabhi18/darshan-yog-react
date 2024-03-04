import { Route, Routes } from "react-router-dom";
import "./App.css";
import RoutesAll from "./RoutesAll";
import FooterComponent from "./Components/FooterComponent";
import HeaderComponent from "./Components/HeaderComponent";
import NavbarComponent from "./Components/NavbarComponent";
import NewHeader from "./Components/NewHeader";

function App() {
  return (
    <>
      {/* <HeaderComponent /> */}
      <NewHeader />
      <Routes>
        <Route path="/*" element={<RoutesAll />} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
