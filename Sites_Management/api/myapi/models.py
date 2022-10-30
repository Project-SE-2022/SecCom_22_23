from django.db import models

class Property(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Camera(models.Model):
    property_id = models.ForeignKey(Property, db_column="property_id", null="False", on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    ip = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Alarm(models.Model):
    SOUND = 'Sound'
    LIGHT = 'Light'
    alarm_types = [ (SOUND,'Sound'), (LIGHT,'Light') ]

    property_id = models.ForeignKey(Property, db_column="property_id", null="False", on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    # type = models.CharField(max_length=200)
    type = models.CharField(max_length=5, choices=alarm_types)
    created = models.DateTimeField(auto_now_add=True)
   
    def __str__(self):
        return self.name