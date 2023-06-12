import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AutoLogout from "./AutoLogout";
const Layout = () => {
  return (
    <>
      <AutoLogout>
        <Navbar />
        <main className="p-10">
          <Outlet />
        </main>
      </AutoLogout>
    </>
  );
};
export default Layout;
