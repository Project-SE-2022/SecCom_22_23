from django.contrib import admin
from .models import Camera, Property, Alarm
# from .models import Cameras,Properties,Alarms

# Register your models here.
admin.site.register(Camera)
admin.site.register(Property)
admin.site.register(Alarm)
