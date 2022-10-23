from django.urls import path
from . import views

urlpatterns = [
    # Cameras URLs
    path('cameras/', views.CameraList.as_view()),
    path('camera/<int:pk>', views.CameraDetail.as_view()),

    # Properties URLs
    path('properties/', views.PropertyList.as_view()),
    path('property/<int:pk>', views.PropertyDetail.as_view()),

    # Alarms URLs
    path('alarms/', views.AlarmList.as_view()),
    path('alarm/<int:pk>', views.AlarmDetail.as_view())
]