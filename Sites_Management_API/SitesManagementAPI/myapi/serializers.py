from datetime import datetime
from rest_framework import serializers
from .models import *
# This file is used to convert the models into json


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ("email", "password", "name")

    def create(self, validated_data):
        return Owner.objects.create_owner(
            validated_data['email'],
            validated_data['password'],
            validated_data['name'],
            validated_data.get('created', datetime.now())
        )

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.name = validated_data.get('name', instance.name)
        instance.created = validated_data.get('created', instance.created)
        instance.save()
        return instance


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ("id", "owner", "designation")

    def create(self, validated_data):
        return Property.objects.create_property(
            validated_data['owner'],
            validated_data['designation'],
            validated_data.get('created', datetime.now())
        )

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.owner = validated_data.get('owner', instance.owner)
        instance.designation = validated_data.get('designation', instance.designation)
        instance.created = validated_data.get('created', instance.created)
        instance.save()
        return instance


"""
from .models import Hero

class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hero
        fields = ('name', 'alias')
"""