import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./LoginPage";
import SupportDashboard from "./SupportDashboard";
import RaiseTicketModal from "./RaiseTicketModal";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="dashboard" element={<SupportDashboard />} />
    </Routes>
  );
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// React before 18
// ReactDOM.render(<App />, document.getElementById("root"));
