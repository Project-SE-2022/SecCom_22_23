from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ClientSerializer, ClientDetailSerializer, CameraSerializer, PropertySerializer, AlarmSerializer
from .models import Camera, Property, Alarm
import requests



# Clients ------------------------------------------------------------------------------------
class ClientsView(APIView):
    serializer_class = ClientSerializer
    def get(self,request):
        allClients = []

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
            allClients = response2.json()
        except:
            return Response(data={"Message":"Connection failed - impossible to connect to Clients Database"},status=404)

        return Response(allClients, status=200)

    def post(self,request):
        serializer_object = ClientSerializer(data=request.data)

        if serializer_object.is_valid():
            accessTokenUrl = 'http://keycloak:8080/auth/realms/Seccom/protocol/openid-connect/token'
            addUserUrl = "http://keycloak:8080/auth/admin/realms/Seccom/users"

            body = {  
                'username':'seccom_tiago',
                'password':'tiago123',
                'grant_type':'password',
                'client_id':'clients_ui'
            }

            payload="{\r\n    \"username\":\""+serializer_object.data.get('username')+"\",\r\n    \"firstName\":\""+serializer_object.data.get('firstname')+"\",\r\n    \"lastName\":\""+serializer_object.data.get('lastname')+"\",\r\n    \"enabled\":true,\r\n    \"emailVerified\":false,\r\n    \"email\":\""+serializer_object.data.get('email')+"\",    \"credentials\":[ {\r\n      \"type\": \"password\",\r\n      \"value\":\"password\"\r\n    }]\r\n}"

            try:
                response = requests.post(accessTokenUrl, data=body, allow_redirects=True)
                token = response.json()["access_token"]
                response2 = requests.request("POST", addUserUrl, headers={
                    'Authorization': 'Bearer '+token+'',
                    'Content-Type': 'application/json'}, data=payload)
                if (response2.status_code==201):
                    getUserByUsername = "http://keycloak:8080/auth/admin/realms/Seccom/users?username="+serializer_object.data.get("username")+"&exact=true"
                    response3 = requests.get(getUserByUsername, headers = {
                        'Authorization': 'Bearer '+token+'',
                        'Content-Type': 'application/json'
                    })
                    return Response(response3.json(),status=200)
                elif (response2.status_code==409):
                    return Response(data={"Message":"User already exist in Clients Database"},status=400)
            except:
                return Response(data={"Message":"Connection failed - impossible to connect to Clients Database"},status=404)
        else:
            return Response(data={"Message":"User data fields are not correct"},status=400)

class ClientDetailView(APIView):
    serializer_class = ClientDetailSerializer
    def get(self,request,id):
        clientId = id
        if clientId is not None:
            try:
                accessTokenUrl = 'http://keycloak:8080/auth/realms/Seccom/protocol/openid-connect/token'
                getUserById = "http://keycloak:8080/auth/admin/realms/Seccom/users/"+clientId+"/"

                body = {  
                    'username':'seccom_tiago',
                    'password':'tiago123',
                    'grant_type':'password',
                    'client_id':'clients_ui'
                }

                response = requests.post(accessTokenUrl, data=body, allow_redirects=True)
                token = response.json()["access_token"]
                response3 = requests.get(getUserById, headers = {
                    'Authorization': 'Bearer '+token+'',
                    'Content-Type': 'application/json'
                })
                return Response(response3.json(),status=200)
            except:
                return Response(data={"Message":"Client does not exist in the database"},status=400)
        else:
            return Response(data={"Message":"Client not found"},status=404)

    def delete(self,request,id):
        clientId = id
        if clientId is not None:
            try:
                accessTokenUrl = 'http://keycloak:8080/auth/realms/Seccom/protocol/openid-connect/token'
                getUserById = "http://keycloak:8080/auth/admin/realms/Seccom/users/"+clientId+"/"

                body = {  
                    'username':'seccom_tiago',
                    'password':'tiago123',
                    'grant_type':'password',
                    'client_id':'clients_ui'
                }

                response = requests.post(accessTokenUrl, data=body, allow_redirects=True)
                token = response.json()["access_token"]
                response3 = requests.delete(getUserById, headers = {
                    'Authorization': 'Bearer '+token+'',
                    'Content-Type': 'application/json'
                })
                return Response(data={"Message":"Client deleted"},status=200)
            except:
                return Response(data={"Message":"Client does not exist in the database"},status=400)
        else:
            return Response(data={"Message":"Client not found"},status=404)

    def put(self,request,id):
        clientId = id
        serializer_object = ClientDetailSerializer(data=request.data)
        if serializer_object.is_valid():
            accessTokenUrl = 'http://keycloak:8080/auth/realms/Seccom/protocol/openid-connect/token'
            getUserById = "http://keycloak:8080/auth/admin/realms/Seccom/users/"+clientId+"/"

            body = {  
                'username':'seccom_tiago',
                'password':'tiago123',
                'grant_type':'password',
                'client_id':'clients_ui'
            }

            payload="{\r\n    \"username\":\""+serializer_object.data.get('username')+"\",\r\n    \"firstName\":\""+serializer_object.data.get('firstname')+"\",\r\n    \"lastName\":\""+serializer_object.data.get('lastname')+"\",\r\n    \"enabled\":true,\r\n    \"emailVerified\":false,\r\n    \"email\":\""+serializer_object.data.get('email')+"\",    \"credentials\":[ {\r\n      \"type\": \"password\",\r\n      \"value\":\"password\"\r\n    }]\r\n}"

            try:
                data = {}
                response = requests.post(accessTokenUrl, data=body, allow_redirects=True)
                token = response.json()["access_token"]
                response2 = requests.request("PUT", getUserById, headers={
                    'Authorization': 'Bearer '+token+'',
                    'Content-Type': 'application/json'}, data=payload)
                if (response2.status_code==200 or response2.status_code==201 or response2.status_code==202 or response2.status_code==203 or response2.status_code==204):
                    response3 = requests.get(getUserById, headers = {
                        'Authorization': 'Bearer '+token+'',
                        'Content-Type': 'application/json'
                    })
                    data["Message"] = "Client updated"
                    data["client"] = response3.json()
                    return Response(data=data,status=200)
                else:
                    return Response(data={"Message":"Not possible to update client data"},status=400)
            except:
                return Response(data={"Message":"Connection failed - impossible to connect to Clients Database"},status=404)
        else:
            return Response(data={"Message":"User data fields are not correct"},status=400)
        

# Cameras ------------------------------------------------------------------------------------ 
class CameraList(generics.ListCreateAPIView):
    serializer_class = CameraSerializer

    def get_queryset(self):
        queryset = Camera.objects.all()
        #property = self.request.query_params.get('property')
        #if property is not None:
        #    queryset = queryset.filter(property=property)
        return queryset

class CameraDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CameraSerializer
    queryset = Camera.objects.all()

# Properties ------------------------------------------------------------------------------------
class PropertyList(generics.ListCreateAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        queryset = Property.objects.all()
        #property = self.request.query_params.get('property')
        #if property is not None:
        #    queryset = queryset.filter(property=property)
        return queryset

class PropertyDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PropertySerializer
    queryset = Property.objects.all()

# Alarms ------------------------------------------------------------------------------------
class AlarmList(generics.ListCreateAPIView):
    serializer_class = AlarmSerializer

    def get_queryset(self):
        queryset = Alarm.objects.all()
        #property = self.request.query_params.get('property')
        #if property is not None:
        #    queryset = queryset.filter(property=property)
        return queryset

class AlarmDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AlarmSerializer
    queryset = Alarm.objects.all()