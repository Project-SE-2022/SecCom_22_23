import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClientInfo from "./pages/ClientInfo";
import Layout from "./pages/Layout";
import 'bootstrap/dist/css/bootstrap.css';
import Keycloak from 'keycloak-js';
import AppNoPermissions from './AppNoPermissions'
import ReactDOM from 'react-dom/client';

let initOptions = {
    "url": "http://localhost:8080/auth/",
    "realm": "Seccom",
    "clientId": "mgmt_ui",
    "onLoad": 'login-required'
}

let keycloak = new Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }

    var pass = -1
    keycloak.tokenParsed["realm_access"]["roles"].forEach(role => {
        if (role === "Admin") {
            pass = 1
        }
    })

    if (pass === -1) {
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(
            <AppNoPermissions />
        );
    } else {
        localStorage.setItem("bearer-token", keycloak.token);
        localStorage.setItem("refresh-token", keycloak.refreshToken);

        setTimeout(() => {
            keycloak.updateToken(70).then((refreshed) => {
                if (refreshed) {
                    console.debug('Token refreshed' + refreshed);
                } else {
                    console.warn('Token not refreshed, valid for '
                        + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
                }
            }).catch(() => {
                console.error('Failed to refresh token');
            });
        }, 60000)

        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(
            <App />
        );
    }
}).catch(() => {
    console.error("Authenticated Failed");
});

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="client-info/*" element={<ClientInfo />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

// const root = createRoot(document.getElementById("root"))
// root.render(<App />);