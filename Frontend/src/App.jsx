import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/Login.jsx";
import SignIn from "./pages/SignIn.jsx";
import UserDashboard from "./pages/UserDashBoard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />  
        <Route path="/userDashboard" element={<UserDashboard/>}/>     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
