from django.shortcuts import HttpResponseRedirect
from rest_framework import generics
from .models import Intrusion

from .serializers import IntrusionSerializer, VideoSerializer, IntrusionSendCamerasSerializer

from rest_framework.views import APIView

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

import boto3
#from botocore import UNSIGNED
from botocore.client import Config

from rest_framework.response import Response

import requests

import kombu
from kombu import Connection, Exchange, Producer, Queue


class IntrusionList(generics.ListCreateAPIView):
    serializer_class = IntrusionSerializer

    def get_queryset(self):
        queryset = Intrusion.objects.all()
        return queryset

class IntrusionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IntrusionSerializer
    queryset = Intrusion.objects.all()

class IntrusionVideo(APIView):

    def get(self, request, id):
        try:
            s3_signature ={
            'v4':'s3v4',
            'v2':'s3'
            }

            signature_version=s3_signature['v4']
            s3 = boto3.client('s3',aws_access_key_id = 'AKIAV3ZBHOANRIWJ6EUL',
                                aws_secret_access_key = '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',
                                config=Config(signature_version=signature_version),
                                region_name='eu-west-3')

            upload_file_bucket = 'seccombucket'
            #TODO: fazer fetch do ID correto
            upload_file_key = 'intrusions/'+ str(id) +'.avi'

            url = s3.generate_presigned_url(
                ClientMethod='get_object',
                Params={
                    'Bucket': upload_file_bucket,
                    'Key': upload_file_key
                }
            )
            return Response(data={"url": str(url)})
        except:
            return Response(data={"url": "Error Video"})
    
    def post(self, request):
        fileVideo = request.FILES['upload_file']
        path = default_storage.save('./myapi/videos/video.avi', ContentFile(fileVideo.read()))
        try:
            client = boto3.resource('s3',aws_access_key_id = 'AKIAV3ZBHOANRIWJ6EUL',
                                aws_secret_access_key = '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')
                
            upload_file_bucket = 'seccombucket'
            upload_file_key = './myapi/videos/video.avi'
            client.meta.client.upload_file(upload_file_key, upload_file_bucket, 'intrusions/' + str(fileVideo))
            path = default_storage.delete('./myapi/videos/video.mp4')
            return Response(status=200)
        except:
            return Response(status=400)

class IntrusionSendCameras(APIView):
    serializer_class = IntrusionSendCamerasSerializer

    def post(self,request):
        serializer_object = IntrusionSendCamerasSerializer(data=request.data)

        if serializer_object.is_valid():
            camera_id = serializer_object.data.get('camera_id')
            intrusion_timestamp = serializer_object.data.get('intrusion_timestamp')
            frame = serializer_object.data.get('frame')

            newIntrusionURL = 'http://imapi:8060/IntrusionManagementAPI/intrusions/'
            
            body = {  
                'camera_id':camera_id,
                'intrusion_timestamp': intrusion_timestamp,
            }

            response = requests.post(newIntrusionURL, data=body)

            intrusion_id = response.json()['id']

            print(f"AQUIIIII:{camera_id}")
            
            # adicionar código para enviar mensagem à camara

            broker_username = "broker"
            broker_password = "rabbitmqbroker"
            broker_url = "b-ca71b7e7-5065-4c38-a312-d3a9ca613905.mq.eu-west-3.amazonaws.com:5671"
            rabbit_url = f"amqp://{broker_username}:{broker_password}" \
                    f"@{broker_url}/"
            conn = Connection(
                    rabbit_url,
                    heartbeat=4,
                    ssl=True)
            channel = conn.channel()
            exchange = Exchange("example-exchange", type="direct")
            producer = Producer(exchange=exchange, channel=channel, routing_key=str(camera_id))
            queue = Queue(name="", exchange=exchange, routing_key=str(camera_id))
            queue.maybe_bind(conn)
            queue.declare()

            print(f"AQUIIIII:{camera_id}")
            producer.publish(f"{frame};{intrusion_id}")

#connect_to_video_queue("320;55")

            return Response(status=200)

        return Response(status=400)

