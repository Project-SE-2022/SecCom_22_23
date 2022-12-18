from django.urls import path
from . import views

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Sites Management API",
        default_version='v1',
        description="This API should be used to track all properties being monitored, along with all" +
        "the logic regarding the “owners” of each property. \nIt should make available endpoints for the creation/update/deletion" +
        "of new properties, creation/update/deletion of new property owners, etc…",
        contact=openapi.Contact(email="admin@seccom.pt"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [

    # Users URLs
    path('users/', views.ClientsView.as_view()),
    path('user/<id>', views.ClientDetailView.as_view()),

    # Cameras URLs
    path('cameras/', views.CameraList.as_view()),
    path('camera/<int:pk>', views.CameraDetail.as_view()),

    # Properties URLs
    path('properties/', views.PropertyList.as_view()),
    path('property/<int:pk>', views.PropertyDetail.as_view()),

    # Alarms URLs
    path('alarms/', views.AlarmList.as_view()),
    path('alarm/<int:pk>', views.AlarmDetail.as_view()),

    # Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0))
]
