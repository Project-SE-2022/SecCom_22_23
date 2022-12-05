import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../Components/TopBar";

const Layout = () => {
    return (
        <main className="Container">
            <TopBar />
            <Outlet />
        </main>
    )
};

export default Layout;