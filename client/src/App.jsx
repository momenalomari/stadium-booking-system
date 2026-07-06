import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 1. استدعاء أدوات التوست
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Hero from "./componant/Landing/landing.jsx";
import Navbar from "./componant/layout/Navbar/navbar.jsx";
import Footer from "./componant/layout/Footer/footer.jsx";
import FieldsList from "./componant/pages/FieldsList.jsx";
import Register from "./componant/Auth/Register.jsx";
import Login from "./componant/Auth/Login.jsx";
import AdminDashboard from "./componant/admin/admin.dashboard.jsx";
import UserDashboard from "./componant/user/user.dashboard.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/fields" element={<FieldsList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />        

        
      </Routes>

      <Footer />
      
      {/* 2. وضع حاوية التوست في أسفل التطبيق (مخفية لحين استدعائها) */}
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;