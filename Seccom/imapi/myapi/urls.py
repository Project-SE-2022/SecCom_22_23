from django.urls import path
from . import views

urlpatterns = [
    # Intrusion URLs
    path('intrusions/', views.IntrusionList.as_view()),
    path('intrusion/<int:pk>', views.IntrusionDetail.as_view()),
    #path('intrusion/<int:pk>/video', views.IntrusionDetail.as_view()),
    path('intrusion/video', views.IntrusionVideo.as_view()),
]