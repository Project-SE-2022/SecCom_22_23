import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8080/auth",
    realm: "Clients_UI",
    clientId: "clients_ui",
});

export default keycloak;