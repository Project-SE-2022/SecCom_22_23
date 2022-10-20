from django.urls import path
from .views import *

urlpatterns = [
    path('property/', getProperty),
    path('property/<int:id>/', getPropertyById),
    
    path('owner/', getOwner),
    path('owner/<int:id>/', getOwnerById),

    path('camera/', getCamera),
    path('camera/<int:id>/', getCameraById),

    path('alarm/', getAlarm),
    path('alarm/<int:id>/', getAlarmById),
]