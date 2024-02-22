import { Route, Routes } from "react-router-dom";
import "./App.css";
import RoutesAll from "./RoutesAll";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<RoutesAll />} />
      </Routes>
    </>
  );
}

export default App;
