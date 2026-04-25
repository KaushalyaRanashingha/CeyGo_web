import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from './pages/Login';
import Register from './pages/Register';
import About from "./pages/About";
import Locations from "./pages/Locations";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import TripPlanner from "./pages/TripPlanner";
import JournalPage from "./pages/Journal";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path ="/TripPlanner" element={<TripPlanner />} />
        <Route path ="/journal" element={<JournalPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
