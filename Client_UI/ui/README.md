# SecCom Client's UI

This UI is solely offered to the owners of the properties. Through it, the property owners should be able to see a listing of all cameras, sensors, intrusion events, etc. Besides this, the property owners should be able to update their information through this UI.

## Setting up Docker

1. Install docker and docker-compose.
```bash
sudo apt update    
sudo apt upgrade    
sudo apt install docker docker.io docker-compose
```

2. Build the API docker image.

```bash
docker build -t clients_ui:dev .
sudo docker images
```

## Usage

1. Run the docker compose and the API will be online.
```bash
sudo docker-compose up
```

2. Build the docker image every time it changes.
```bash
docker build -t clients_ui:dev .
```