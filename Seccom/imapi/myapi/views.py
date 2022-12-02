from django.shortcuts import HttpResponseRedirect
from rest_framework import generics
from .models import Intrusion

from .serializers import IntrusionSerializer, VideoSerializer

from rest_framework.views import APIView

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

import boto3
#from botocore import UNSIGNED
from botocore.client import Config

from rest_framework.response import Response



class IntrusionList(generics.ListCreateAPIView):
    serializer_class = IntrusionSerializer

    def get_queryset(self):
        queryset = Intrusion.objects.all()
        return queryset

class IntrusionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IntrusionSerializer
    queryset = Intrusion.objects.all()

class IntrusionVideo(APIView):

    def get(self, request):
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
            upload_file_key = 'intrusions/30.avi'

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

