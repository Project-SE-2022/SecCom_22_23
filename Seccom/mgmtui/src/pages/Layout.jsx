import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../Components/TopBar";

const Layout = (name) => {
    return (
        <main className="Container">
            <TopBar name={name.name} />
            <Outlet />
        </main>
    )
};

export default Layout;