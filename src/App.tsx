import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "@/pages/Home";
import Panic from "@/pages/Panic";
import Journal from "@/pages/Journal";
import MoodDetox from "@/pages/MoodDetox";
import Ballpit from "@/components/Ballpit";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        const fadeInTimer = setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
        return () => clearTimeout(fadeInTimer);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div className="relative min-h-screen bg-black">
      {isHome && (
        <>
          <div className="absolute inset-0 z-0">
            <Ballpit
              count={100}
              gravity={0.05}
              friction={0.9975}
              wallBounce={0.95}
              followCursor={true}
              minSize={0.5}
              maxSize={1.2}
              colors={[0x9c43fe, 0x4cc2e9, 0x101499]}
              ambientIntensity={0.6}
              materialParams={{
                metalness: 0.05,
                roughness: 0.2,
                clearcoat: 0.2,
                clearcoatRoughness: 0.1,
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 pointer-events-none z-5" />
        </>
      )}

      <Navbar />

      <div 
        className={`transition-all duration-500 ease-out ${
          isTransitioning 
            ? 'opacity-0 transform translate-y-2 scale-[0.98]' 
            : 'opacity-100 transform translate-y-0 scale-100'
        }`}
        style={{
          transitionTimingFunction: isTransitioning 
            ? 'cubic-bezier(0.4, 0, 0.6, 1)' 
            : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/panic" element={<Panic />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/mood-detox" element={<MoodDetox />} />
        </Routes>
      </div>
    </div>
  );
}
