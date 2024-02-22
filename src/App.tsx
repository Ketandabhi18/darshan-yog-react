import { Route, Routes } from "react-router-dom";
import "./App.css";
import RoutesAll from "./RoutesAll";
import FooterComponent from "./Components/FooterComponent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<RoutesAll />} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
