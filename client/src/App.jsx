import React from "react";
import { Route, Routes } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";
import UserPage from "./pages/UserPage.jsx";
import ProductCatalogPage from "./pages/ProductCatalogPage";
import CustomerManagementPage from "./pages/CustomerManagementPage";
import PagenotFound from "./pages/PagenotFound.jsx";
import Categories from "./pages/Categories";
import SigninPage from "./pages/SigninPage.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/invoice" element={<CheckoutPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/products" element={<ProductCatalogPage />} />
        <Route path="/inventory" element={<CustomerManagementPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
}

export default App;
