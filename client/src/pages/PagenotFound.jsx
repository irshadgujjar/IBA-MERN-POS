import React from "react";
import error from "../assets/error.gif";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function PagenotFound() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div
        className="flex items-center justify-center h-screen"
        style={{ marginTop: "70px", marginLeft: "280px" }}
      >
        <div className="text-center">
          <p className="text-base font-semibold text-red-900">404</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl text-red-900">
            Page not found
          </h1>
          <img src={error} alt="not found" />
          <p className="mt-4 text-base leading-7 text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="mt-4 flex items-center justify-center gap-x-3"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
