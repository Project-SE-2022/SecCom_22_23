from django.urls import path
from . import views

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Intrusion Management API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    # Intrusion URLs
    path('intrusions/', views.IntrusionList.as_view()),
    path('intrusion/<int:pk>', views.IntrusionDetail.as_view()),
    path('intrusion/video', views.IntrusionVideo.as_view()),
    path('intrusion/send/cameras', views.IntrusionSendCameras.as_view()),

    # Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
