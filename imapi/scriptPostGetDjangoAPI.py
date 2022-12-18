import requests

payload = {
    "camera_id": 1234567,
    "intrusion_timestamp": "2018-12-19 09:26:03.478039"
}

#POST
r = requests.post('http://127.0.0.1:8060/IntrusionManagementAPI/intrusions/', json=payload)
print(r.text)

#GET
r = requests.get('http://127.0.0.1:8060/IntrusionManagementAPI/intrusions/')
print(r.text)