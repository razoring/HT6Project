import requests
import json
import os

key = "sk_1384d47cc749035ea0f6d9b82426ffacd4a5e2d3f5fd8a35"
url = "https://api.elevenlabs.io/v1/voices"
headers = {"xi-api-key": key}
resp = requests.get(url, headers=headers)
print(resp.text)
