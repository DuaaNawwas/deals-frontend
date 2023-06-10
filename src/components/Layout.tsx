import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="p-10">
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
