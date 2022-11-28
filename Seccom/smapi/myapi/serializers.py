# from datetime import datetime
from rest_framework import serializers
from .models import *
# This file is used to convert the models into json

class ClientSerializer(serializers.Serializer):
    username = serializers.CharField(label="Username")
    firstname = serializers.CharField(label="Firstname")
    lastname = serializers.CharField(label="Lastname")
    email = serializers.CharField(label="Email")

class ClientDetailSerializer(serializers.Serializer):
    username = serializers.CharField(label="Username",initial="")
    firstname = serializers.CharField(label="Firstname",initial="")
    lastname = serializers.CharField(label="Lastname",initial="")
    email = serializers.CharField(label="Email",initial="")

class CameraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera
        fields = ('__all__')

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ('__all__')

class AlarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alarm
        fields = ('__all__')


"""
from .models import Hero

class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hero
        fields = ('name', 'alias')
"""