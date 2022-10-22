from datetime import datetime
from rest_framework import serializers
from .models import Owner
# This file is used to convert the models into json


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ("email", "password", "name")

    def create(self, validated_data):
        owner = Owner.objects.create_owner(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
        )
        owner.save()
        return owner

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


"""
from .models import Hero

class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hero
        fields = ('name', 'alias')
"""