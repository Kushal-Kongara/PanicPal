import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "@/pages/Home";
import Panic from "@/pages/Panic";
import Journal from "@/pages/Journal";
import MoodDetox from "@/pages/MoodDetox";
import Ballpit from "@/components/Ballpit";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="relative min-h-screen">
      {/* Background: Ballpit only on Home */}
      {isHome && (
        <div
          className="absolute inset-0 -z-10 overflow-hidden"
          style={{ minHeight: "100vh", maxHeight: "100vh", width: "100%" }}
        >
          <Ballpit
            count={200}
            gravity={0.7}
            friction={0.8}
            wallBounce={0.95}
            followCursor={true}
          />
        </div>
      )}

      {/* Gradient overlay to help contrast */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panic" element={<Panic />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/mood-detox" element={<MoodDetox />} />
      </Routes>
    </div>
  );
}
