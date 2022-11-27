import requests
import json
import urllib.request as requestURL

allClientID = []

accessTokenUrl = 'http://localhost:8080/auth/realms/Seccom/protocol/openid-connect/token'
usersURl = 'http://localhost:8080/auth/admin/realms/Seccom/users'

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
        allClientID.append(client["id"])
    print(allClientID)
except:
    print("ERROR")