import React from 'react'
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import keycloak from "./Keycloak"
import { ReactKeycloakProvider } from "@react-keycloak/web";
import PrivateRoute from "./helpers/PrivateRoute";

export default function App() {
  return (
    <div>
      <ReactKeycloakProvider authClient={keycloak}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={ <PrivateRoute> <Dashboard /> </PrivateRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ReactKeycloakProvider>
    </div>
  );
}

const root = createRoot(document.getElementById("root"))
root.render(<App />);