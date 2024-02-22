import { Route, Routes } from "react-router-dom";
import "./App.css";
import RoutesAll from "./RoutesAll";
import HeaderComponent from "./Components/HeaderComponent";

function App() {
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route path="/*" element={<RoutesAll />} />{" "}
      </Routes>
    </>
  );
}

export default App;
