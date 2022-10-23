from django.http import HttpResponse
from rest_framework.views import APIView
import json
from .serializers import OwnerSerializer
from .models import Owner


class OwnerView(APIView):

    def put(self, request):
        data = json.loads(request.data)
        serializer = OwnerSerializer(data=data)
        if serializer.is_valid():
            instance = serializer.save()
            msg = f"Owner was created with id: {instance.id}"
            print(msg)
            return HttpResponse(msg)
        else:
            msg = f"Invalid data! {data}, {serializer.errors}"
            print(msg)
            return HttpResponse(msg)

    def post(self, request):
        data = json.loads(request.data)
        owner = Owner.objects.filter(id=data['id'])[0]
        serializer = OwnerSerializer(owner, data=data)
        if serializer.is_valid():
            owner = serializer.save()
            msg = f"update request to owner with id {owner.id}"
            print(msg)
            return HttpResponse(msg)
        else:
            msg = f"Invalid data! {data}, {serializer.errors}"
            print(msg)
            return HttpResponse(msg)



# Get all properties
def getProperty(request):
    message = f'ALL properties'
    return HttpResponse(message)

# Get property by Id
def getPropertyById(request,id=None):
    message = f'Property {id}'
    return HttpResponse(message)



# Get all owners
def getOwner(request):
    message = f'ALL owners'
    return HttpResponse(message)

# Get owner by Id
def getOwnerById(request,id=None):
    message = f'Owner {id}'
    return HttpResponse(message)



# Get all cameras
def getCamera(request):
    message = f'ALL cameras'
    return HttpResponse(message)

# Get camera by Id
def getCameraById(request,id=None):
    message = f'Camera {id}'
    return HttpResponse(message)



# Get all alarms
def getAlarm(request):
    message = f'ALL alarms'
    return HttpResponse(message)

# Get alarm by Id
def getAlarmById(request,id=None):
    message = f'Alarm {id}'
    return HttpResponse(message)