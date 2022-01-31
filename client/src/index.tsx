import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./components/App";
import OtherPage from "./components/OtherPage";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/other" element={<OtherPage />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
