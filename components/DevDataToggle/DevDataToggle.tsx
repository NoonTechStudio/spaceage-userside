"use client";
import { useState, useEffect } from "react";

export default function DevDataToggle() {
  const [isMock, setIsMock] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsMock(localStorage.getItem("use_mock_data") === "true");
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const newValue = !isMock;
    setIsMock(newValue);
    localStorage.setItem("use_mock_data", String(newValue));
    window.location.reload();
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1a1a1a] text-white hover:bg-[#c9a84c] border border-[#c9a84c] rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 select-none cursor-pointer"
    >
      <span className={`w-2 h-2 rounded-full ${isMock ? "bg-amber-400" : "bg-emerald-400"}`} />
      Showing: {isMock ? "Mock Data" : "Real Data"}
    </button>
  );
}
