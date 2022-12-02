import requests

url = "http://localhost:8060/IntrusionManagementAPI/intrusion/video"
files = {'upload_file': open('people-detection.mp4','rb')}
values = {'DB': 'photcat', 'OUT': 'csv', 'SHORT': 'short'}
r = requests.post(url, files=files, data=values)