from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.

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