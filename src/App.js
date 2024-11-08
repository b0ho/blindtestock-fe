import React from "react";
import "./App.css";
import MainPage from "./blindtestock/MainPage";
import BlindTestPage from "./blindtestock/BlindTestPage";
import OpenTestPage from "./blindtestock/BuyAdvicePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/blind-test" element={<BlindTestPage />} />
          <Route path="/buy-advice" element={<OpenTestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
