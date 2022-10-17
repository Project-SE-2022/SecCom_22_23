import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../components/Navbar";

const Layout = () => {
    return (
        <div>
            <TopBar />
            <Outlet />
        </div>
    );
};

export default Layout;