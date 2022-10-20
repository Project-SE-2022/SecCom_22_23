## Postgresql container

1. Run the docker compose.
```bash
sudo docker-compose up
```

2. In other terminal connect to the database via bash.
```bash
sudo docker exec -it sites_management_api_db_1 bash
```

3. Enter the CLI postgresql.
```bash
psql -U postgres
```
