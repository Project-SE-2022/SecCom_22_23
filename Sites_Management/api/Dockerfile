FROM python:3.8
 
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /django

COPY requirements.txt .
 
RUN pip3 install -r requirements.txt

COPY . .
 
EXPOSE 8050

CMD ["python3","manage.py","runserver","8050"]