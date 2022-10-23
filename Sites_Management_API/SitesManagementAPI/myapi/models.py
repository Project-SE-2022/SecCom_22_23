from django.db import models
from datetime import datetime


class OwnerManager(models.Manager):

    def create_owner(self, email, password, name, created=None):
        created = created or datetime.now()
        owner = Owner(email=email, password=password, name=name, created=created)
        owner.save()
        return owner


class Owner(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=50)
    name = models.CharField(max_length=200)
    created = models.DateTimeField()

    objects = OwnerManager()

    def __str__(self):
        return f"Owner:{{id: {self.id}, email: {self.email}, name: {self.name}, created: {self.created}}}"


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