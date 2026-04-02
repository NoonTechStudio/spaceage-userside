// components/LayoutWrapper.tsx
"use client";

import { ReactNode } from "react";
import Header from '../Header/Header';

interface LayoutWrapperProps {
  children: ReactNode;
  showNavbar?: boolean;
}

export default function LayoutWrapper({ children, showNavbar = true }: LayoutWrapperProps) {
  return (
    <div className="min-h-screen bg-white">
      {showNavbar && <Header />}
      <main className="relative">
        {children}
      </main>
    </div>
  );
}