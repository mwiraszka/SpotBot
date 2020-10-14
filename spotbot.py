# SPOTBOT
# by Michal Wiraszka

# SpotBot takes a folder of .mp3 files, searches for songs on Spotify,
# and automatically sorts them into playlists based on user-given rules. 
  
# 12.10.20 initial commit to github repo
# 13.10.20 client credentials flow & initial Spotify Web API request

import requests
import base64

client_id = 'f6d4f8e2d7934b1cbaac6f700261bcbf'
client_secret = 'a524a17ac57740dc89460d9370e7df08'
client_creds = f'{client_id}:{client_secret}'
client_creds_b64 = base64.b64encode(client_creds.encode())

token_url = 'https://accounts.spotify.com/api/token'
method = 'POST'
token_data = {
		'grant_type': 'client_credentials'
}
token_headers = {
	# Basic <base64 encoded client_id:client_secret>
	'Authorization': f'Basic {client_creds_b64.decode()}'
}

r = requests.post(token_url, data=token_data, headers=token_headers)
print(r.json())


