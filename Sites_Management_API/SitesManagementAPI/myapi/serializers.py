# serializers.py
from rest_framework import serializers

# This file is used to convert the models into json

# Eg:
"""
from .models import Hero

class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hero
        fields = ('name', 'alias')
"""