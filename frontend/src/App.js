import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Orderform from "./pages/Orderform";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Otpp from "./pages/Otpp.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Success from "./pages/Success";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" excat element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orderform" element={<Orderform />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/otp" element={<Otpp />} />

          <Route path="*" element={<Error />} />
          <Route path="/success" element={<Success />} />

          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
