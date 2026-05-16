import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/register";
import Interface from "./pages/Interface";
import Destinations from "./pages/Destinations";
import Budget from "./pages/Budget";
import Weather from "./pages/Weather";
import Hotels from "./pages/Hotels";
import Restaurants from "./pages/Restaurants";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<register />} />
        <Route path="/interface" element={<Interface />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/restaurants" element={<Restaurants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;