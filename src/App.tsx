import axios from "axios";
import "./App.css";
import Footer from "./components/footer/Footer";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
