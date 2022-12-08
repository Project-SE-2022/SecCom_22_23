from rest_framework import serializers
from .models import Intrusion

class IntrusionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intrusion
        fields = ('__all__')

class VideoSerializer(serializers.Serializer):
    files = serializers.FileField()

class IntrusionSendCamerasSerializer(serializers.Serializer):
    camera_id = serializers.CharField(label="Camera id")
    intrusion_timestamp = serializers.CharField(label="Intrusion timestamp")
    frame = serializers.CharField(label="Frame")