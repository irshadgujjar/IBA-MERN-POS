import React from "react";
import { MdGpsFixed } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-4 b">
      <div className="container mx-auto flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sm font-medium">
            &copy; {new Date().getFullYear()} Irshad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
