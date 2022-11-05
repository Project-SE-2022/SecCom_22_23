from rest_framework import generics
from .models import Intrusion

from .serializers import IntrusionSerializer

class IntrusionList(generics.ListCreateAPIView):
    serializer_class = IntrusionSerializer

    def get_queryset(self):
        queryset = Intrusion.objects.all()
        return queryset

class IntrusionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IntrusionSerializer
    queryset = Intrusion.objects.all()