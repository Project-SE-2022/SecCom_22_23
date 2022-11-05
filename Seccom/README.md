# Client_UI

This UI is solely offered to the owners of the properties. Through it, the property owners should be able to see a listing of all cameras, sensors, intrusion events, etc. Besides this, the property owners should be able to update their information through this UI.

## Setting up Docker

1. Install docker and docker-compose.
```bash
sudo apt update    
sudo apt upgrade    
sudo apt install docker docker.io docker-compose
```

## Usage

1. Run the docker compose and the API will be online.
```bash
docker-compose up
```

2. Build the docker image every time it changes.
```bash
docker-compose build
```

## Export keycloak realm

1. Run the following command to export the Clients_UI realm.
```bash
docker exec -it keycloak /opt/jboss/keycloak/bin/standalone.sh \
-Djboss.socket.binding.port-offset=100 \
-Dkeycloak.migration.action=export \
-Dkeycloak.migration.provider=singleFile \
-Dkeycloak.migration.realmName=Clients_UI \
-Dkeycloak.migration.usersExportStrategy=REALM_FILE \
-Dkeycloak.migration.file=/tmp/export/Clients_UI-realm.json
```

2. Run the following command to export the Management_UI realm.
```bash
docker exec -it keycloak /opt/jboss/keycloak/bin/standalone.sh \
-Djboss.socket.binding.port-offset=100 \
-Dkeycloak.migration.action=export \
-Dkeycloak.migration.provider=singleFile \
-Dkeycloak.migration.realmName=Management_UI \
-Dkeycloak.migration.usersExportStrategy=REALM_FILE \
-Dkeycloak.migration.file=/tmp/export/Management_UI-realm.json
```