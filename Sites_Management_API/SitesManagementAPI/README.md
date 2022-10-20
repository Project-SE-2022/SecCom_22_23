# SecCom Sites Management API


## Virtual Environment

1. Create Virtual Environment
```bash
python3 -m venv venv
```

2. Enter into the Virtual Environment
```bash
source venv/bin/activate
```

## Run Sites Management API

Use the following commands in the Virtual Environment

```bash
docker-compose build
docker-compose up
```

Should run on port 8050

To access administrator go on port 8050/admin with the following credentials:

usernaem: smapiAdmin

password: smapi12345

## Useful Django Commands

Use the following commands in the Virtual Environment

1. Install Django.
```bash
python -m pip install django
```

2. Check Django Version.
```bash
python -m django --version
```

3. Install Django REST Framework.
```bash
pip install djangorestframework
```

4. Run Django Server.
```bash
python manage.py runserver {port}
```

5. Whether define or change a model, Migrate those changes
```bash
python manage.py makemigrations
python manage.py migrate
```