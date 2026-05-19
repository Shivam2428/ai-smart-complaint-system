import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddComplaint from "./pages/AddComplaint";
import Complaints from "./pages/Complaints";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddComplaint />} />
        <Route path="/complaints" element={<Complaints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;