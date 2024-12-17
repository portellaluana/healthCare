import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Home from "./pages/Home";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/agendamentos" element={<Appointments />} />
          <Route path="/avisos" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
