from django.db import models
from datetime import datetime


class OwnerManager(models.Manager):

    def create_owner(self, email, password, name, created=None):
        created = created or datetime.now()
        return Owner(email, password, name, created)


class Owner(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=50)
    name = models.CharField(max_length=200)
    created = models.DateTimeField()

    objects = OwnerManager()


class PropertyManager(models.Manager):

    def create_property(self, owner, designation, created=None):
        created = created or datetime.now()
        return Property(owner,designation, created)


class Property(models.Model):
    id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    designation = models.CharField(max_length=200)
    created = models.DateTimeField()

    objects = PropertyManager()



"""
class Alarms(models.Model):
    pass

class Properties(models.Model):
    pass

class Cameras(models.Model):
    pass
"""