# SecCom Sites Management API

## Create an virtual environment

1. Create an virtual environment.
```bash
python3 -m venv venv
```

2. Enter into the virtual environment.
```bash
source venv/bin/activate
```

## Admin credentials to Sites Management API

To access administrator go on **{port}**/admin with the following credentials:

username: smapiAdmin
<br>
password: smapi12345

## Run Django API locally

Use the following commands in the Virtual Environment

1. Install the requirements needed.
```bash
pip -r install requirements.txt
```

2. Run Django Server.
```bash
python3 manage.py runserver {port}
```

3. Whether define or change a model, migrate those changes.
```bash
python3 manage.py makemigrations myapi
python3 manage.py migrate myapi
```

4. Create `auth_users` table.
```
./manage.py migrate
```
To create the admin user
```
./python manage.py createsuperuser
```
**Username:** smapiAdmin
<br>
**password:** smapi12345 

## Run Django API via docker

1. Run the API docker image (127.0.0.1).
```bash
docker-compose up
```

2. To build the new API code.
```bash
docker-compose build
```

