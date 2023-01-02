import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/admin/dashboard";

import ProductListing from "./pages/admin/products";
import ProductsEdit from "./pages/admin/products/products.edit";
import ProductsRegister from "./pages/admin/products/products.register";

import UserListing from "./pages/admin/users";
import UsersEdit from "./pages/admin/users/users.edit";
import UsersRegister from "./pages/admin/users/users.register";

import Home from "./pages/client/home";
import ProductsDetails from "./pages/client/products/products.details";

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:_id" element={<ProductsDetails />} />

        <Route path="/admin" element={<Dashboard />} />

        <Route path="/admin/products" element={<ProductListing />} />
        <Route path="/admin/products/register" element={<ProductsRegister />} />
        <Route path="/admin/products/edit/:_id" element={<ProductsEdit />} />

        <Route path="/admin/users" element={<UserListing />} />
        <Route path="/admin/users/register" element={<UsersRegister />} />
        <Route path="/admin/users/edit/:_id" element={<UsersEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
