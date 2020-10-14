# SPOTBOT
# by Michal Wiraszka

# SpotBot takes a folder of .mp3 files, searches for songs on Spotify,
# and automatically sorts them into playlists based on user-given rules. 
  
# 12.10.20 initial commit to github repo
# 13.10.20 client credentials flow & initial Spotify Web API request
# 14.10.20 client object rewritten as a SpotifyAPI class

import requests
import datetime
from urllib.parse import urlencode
import base64

# ---Spotify Base API---
class SpotifyAPI(object):
	access_token = None
	acess_token_expires = datetime.datetime.now()
	access_token_did_expire = True
	client_id = None
	client_secret = None
	token_url = 'https://accounts.spotify.com/api/token'

	def __init__(self, client_id, client_secret, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.client_id = client_id
		self.client_secret = client_secret

	def get_client_credentials(self):
		# Returns a base64 encoded string
		client_id = self.client_id
		client_secret = self.client_secret
		if client_secret == None or client_id == None:
			raise Exception('Error: Client ID or Client Secret could not be found.')
		client_creds = f'{client_id}:{client_secret}'
		client_creds_b64 = base64.b64encode(client_creds.encode())
		return client_creds_b64.decode()

	def get_token_headers(self):
		# Basic <base64 encoded client_id:client_secret>	
		client_creds_b64 = self.get_client_credentials()
		return {
			'Authorization': f'Basic {client_creds_b64}'
		}

	def get_token_data(self):
		return {
			'grant_type': 'client_credentials'
		}

	def perform_auth(self):
		token_url = self.token_url
		token_data = self.get_token_data()
		token_headers = self.get_token_headers()
		r = requests.post(token_url, data=token_data, headers=token_headers)
		if r.status_code not in range(200,299):
			return False
		data = r.json()
		now = datetime.datetime.now()
		access_token = data['access_token']
		expires_in = data['expires_in']
		expires = now + datetime.timedelta(seconds=expires_in)
		self.access_token = access_token
		self.access_token_expires = expires
		self.access_token_did_expire = expires < now
		return True

# ---Spotify client---	
method = 'POST'
client_id = 'f6d4f8e2d7934b1cbaac6f700261bcbf'
client_secret = None #temporarily removed

spotify = SpotifyAPI(client_id, client_secret)
spotify.perform_auth()


# ---Search query---
headers = {
	'Authorization': f'Bearer {spotify.access_token}'
}
endpoint = 'https://api.spotify.com/v1/search'

# Converts a dictionary into a URL-ready string
data = urlencode({'q': 'Time', 'type': 'track'})

lookup_url = f'{endpoint}?{data}'
r = requests.get(lookup_url, headers=headers)
print(r.json())



