FROM python:3.8-slim

WORKDIR /usr/src/app

#ENV AWS b-12c86b11-a318-42b8-961c-2da461a9b0d1.mq.eu-west-3.amazonaws.com:5671

COPY requirements.txt ./

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN pip install --upgrade pip
RUN pip3 install --no-cache-dir -r requirements.txt
RUN pip install -r requirements.txt

COPY ./human-detection-module ./human-detection-module
#COPY . .
WORKDIR /usr/src/app/human-detection-module

ENV USER broker
ENV PASS rabbitmqbroker
ENV AWS b-3e4f0d06-16e8-4ae5-86bf-356c81a3f4c4.mq.eu-west-3.amazonaws.com:5671
#CMD [ "python3", "./main.py" ]
#CMD python3 -u ./main.py
CMD [ "python3", "./main.py", "$AWS", "$USER", "$PASS" ]
#CMD [ "python3", "./a.py" ]

