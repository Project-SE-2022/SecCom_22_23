from rest_framework import serializers
from .models import Intrusion

class IntrusionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intrusion
        fields = ('__all__')