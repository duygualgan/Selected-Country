import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllCountries from "./components/country/AllCountries";
import CInfo from "./components/countryInfo/CInfo";
function App() {
  return (
    <>
      <header className="header">
        <div className="container">
          <h5>Selected Country</h5>
        </div>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<AllCountries />} />
          <Route path="/country/:countryName" element={<CInfo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
