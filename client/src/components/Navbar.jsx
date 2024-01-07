import React, { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-0 w-full bg-slate-900 text-white z-50">
      <div className="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Your logo path */}
            </svg>
          </span>
          <span className="font-bold text-xl"> POS</span>
        </div>

        <div className="ml-2 mt-2 hidden lg:block">
          <span className="relative inline-block">
            <img
              className="h-10 w-10 rounded-full border-2 border-white"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq95RVN5QM9DYpnh-CyorKDMd_9MgcKprwM6QNnMTMfA&s"
              alt="User"
            />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
