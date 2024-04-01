import axios from "axios";
import "./App.css";
import Footer from "./components/footer/Footer";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  return (
    <main className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<div>Hello</div>} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
