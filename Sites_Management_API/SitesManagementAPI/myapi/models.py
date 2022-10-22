from django.db import models
from datetime import datetime


class Owner(models.Model):

    def __init__(self, email, password, name, created=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.email = email
        self.password = password
        self.name = name
        self.created = created or datetime.now()


class Property(models.Model):
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    designation = models.CharField(max_length=200)



"""
class Alarms(models.Model):
    pass

class Properties(models.Model):
    pass

class Cameras(models.Model):
    pass
"""