from rest_framework import generics
from .serializers import CameraSerializer, PropertySerializer, AlarmSerializer
from .models import Camera, Property, Alarm

# Cameras ------------------------------------------------------------------------------------ 
class CameraList(generics.ListCreateAPIView):
    serializer_class = CameraSerializer

    def get_queryset(self):
        queryset = Camera.objects.all()
        #property = self.request.query_params.get('property')
        #if property is not None:
        #    queryset = queryset.filter(property=property)
        return queryset

class CameraDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CameraSerializer
    queryset = Camera.objects.all()

# Properties ------------------------------------------------------------------------------------
class PropertyList(generics.ListCreateAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        queryset = Property.objects.all()
        #property = self.request.query_params.get('property')
        #if property is not None:
        #    queryset = queryset.filter(property=property)
        return queryset

class PropertyDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PropertySerializer
    queryset = Property.objects.all()

# Alarms ------------------------------------------------------------------------------------
class AlarmList(generics.ListCreateAPIView):
    serializer_class = AlarmSerializer

    def get_queryset(self):
        queryset = Alarm.objects.all()
        #property = self.request.query_params.get('property')
        #if property is not None:
        #    queryset = queryset.filter(property=property)
        return queryset

class AlarmDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AlarmSerializer
    queryset = Alarm.objects.all()