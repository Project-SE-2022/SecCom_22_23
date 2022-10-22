from django.urls import path
from . import views

urlpatterns = [
    path('owner/', views.OwnerView.as_view()),
    path('property/', views.PropertyView.as_view()),
    # path('property/<int:id>/', getPropertyById),
    #
    # path('owner/', getOwner),
    # path('owner/<int:id>/', getOwnerById),
    #
    # path('camera/', getCamera),
    # path('camera/<int:id>/', getCameraById),
    #
    # path('alarm/', getAlarm),
    # path('alarm/<int:id>/', getAlarmById),
]