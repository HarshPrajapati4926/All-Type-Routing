// App.jsx
import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // <-- No Router here
import Login from "./components/Login/Login"
import Homepage from './pages/homepage'
import Signup from "./components/SignUp/SignUp";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/homepage"
        element={isAuthenticated ? <Homepage onLogout={handleLogout} /> : <Navigate to="/login" />}
      >
        
        </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
