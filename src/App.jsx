import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import Home from "@/components/pages/Home";
import Courses from "@/components/pages/Courses";
import Membership from "@/components/pages/Membership";
import Dashboard from "@/components/pages/Dashboard";
import MyAccount from "@/components/pages/MyAccount";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-account" element={<MyAccount />} />
          </Routes>
        </main>
        
        <Footer />
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;