FROM python:3.10-alpine
 
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /imapi

COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip3 install -r requirements.txt

COPY . .
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod o+x /entrypoint.sh

#EXPOSE 8060

ENTRYPOINT ["sh", "-c", "/entrypoint.sh"]
