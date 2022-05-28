import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import BusStop from "./Pages/BusStop";
import SideBar from "./Component/SideBar";
import "./index.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/route/:id" element={<BusStop />} />
        </Routes>
        <SideBar />
      </Router>
    </div>
  );
}

export default App;
