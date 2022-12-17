from django.db import models
import requests
import json

class Property(models.Model):
    allClientID = []

    accessTokenUrl = 'http://keycloak:8080/auth/realms/Seccom/protocol/openid-connect/token'
    usersURl = 'http://keycloak:8080/auth/admin/realms/Seccom/users'
    
    body = {  
        'username':'seccom_tiago',
        'password':'tiago123',
        'grant_type':'password',
        'client_id':'clients_ui'
    }

    try:
        response = requests.post(accessTokenUrl, data=body, allow_redirects=True)
        token = response.json()["access_token"]
        response2 = requests.get(usersURl, headers = {
                    'Authorization': 'Bearer '+token+'',
                    'Content-Type': 'application/json'
                })
        for client in response2.json():
            allClientID.append((client["id"],client["id"]))
    except:
        allClientID = []
    
    clientID = models.CharField(max_length=200, choices=allClientID, default=None)
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

    ACTIVATED = 'Activated'
    DEACTIVATED = 'Deactivated'
    activated_types = [ (ACTIVATED,'Activated'), (DEACTIVATED,'Deactivated') ]

    property_id = models.ForeignKey(Property, db_column="property_id", null="False", on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    # type = models.CharField(max_length=200)
    type = models.CharField(max_length=5, choices=alarm_types)
    activated = models.CharField(max_length=11, choices=activated_types, default=DEACTIVATED)
    created = models.DateTimeField(auto_now_add=True)
   
    def __str__(self):
        return self.name