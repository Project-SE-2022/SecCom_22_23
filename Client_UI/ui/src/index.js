import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Keycloak from 'keycloak-js';

let initOptions = {
	"url": "http://localhost:8080/auth/",
	"realm": "Clients_UI",
	"clientId": "clients_ui",
	"onLoad": 'login-required'	
}

let keycloak = new Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }

    localStorage.setItem("bearer-token", keycloak.token);
    localStorage.setItem("refresh-token", keycloak.refreshToken);
    // console.log(keycloak.token);

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
}).catch(() => {
    console.error("Authenticated Failed");
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<App />
);
