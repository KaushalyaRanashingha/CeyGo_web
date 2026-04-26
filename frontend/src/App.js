import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Interface from "./pages/Interface";
import Destinations from "./pages/Destinations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/interface" element={<Interface />} />
        <Route path="/destinations" element={<Destinations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;