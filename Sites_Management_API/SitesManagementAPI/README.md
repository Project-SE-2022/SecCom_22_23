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