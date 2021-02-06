# SPOTBOT
# by Michal Wiraszka

# SpotBot takes a folder of .mp3 files, searches for songs on Spotify,
# and automatically sorts them into playlists based on user-given rules. 

import os
from tinytag import TinyTag, TinyTagException
import spotipy
from creds import get_creds

def determine_playlist(track_tag):
	if track_tag.genre in [
			'Rock',
			'Alt. Rock',
			'Progressive Rock',
			'Progressive Metal',
			'Indie Rock'
			]:
		if track_tag.duration > 300:
			# 5 minutes+ in length
			playlist = 'SB - Expansive Rock'
		else:
			playlist = 'SB - Rock'
	else:
		playlist = 'SB - (Other)'
	return playlist

def organize_tracks(given_root):
	tracks = {}
	num_mp3 = 0
	num_m4a = 0
	num_wav = 0
	num_aiff = 0
	files_total = 0
	for root, dirs, files in os.walk(given_root):
		for name in files:
			files_total += 1
			if name.endswith(('.mp3', '.m4a', '.wav', '.aiff')):
				try:
					track_tag = TinyTag.get(root + '/' + name)
					playlist = determine_playlist(track_tag)
					new_track = track_tag.artist + '-' + track_tag.title
					tracks[new_track] = playlist
					if name.endswith('.mp3'):
						num_mp3 += 1
					elif name.endswith('.m4a'):
						num_m4a += 1
					elif name.endswith('.wav'):
						num_wav += 1
					else:
						num_aiff += 1
				except TinyTagException:
					print('Error retrieving ID3 tag info!')
				
	return tracks, files_total, num_mp3, num_m4a, num_wav, num_aiff


dir_to_search = './Songs to Add'
tracks, files_total, num_mp3, num_m4a, num_wav, num_aiff = organize_tracks(dir_to_search)
print('\n\n\n\n\n\n\n\n\n\n\n\n\n')
print('SpotBot found {} files in folder "{}".'.format(files_total, dir_to_search[2:]))
print('Of those, {} were audio files... '.format(len(tracks)))
print(f'{num_mp3} .mp3\'s')
print(f'{num_m4a} .m4a\'s')
print(f'{num_wav} .wav\'s')
print(f'{num_aiff} .aiff\'s\n')
for key in tracks:
	print(key, tracks[key])
print('\n\n\n\n\n\n\n\n\n\n\n\n\n')


# import datetime
# import base64
# from urllib.parse import urlencode
# import requests

# # ---Spotify Base API---
# class SpotifyAPI(object):
# 	access_token = None
# 	access_token_expires = datetime.datetime.now()
# 	access_token_did_expire = True
# 	client_id = None
# 	client_secret = None
# 	token_url = 'https://accounts.spotify.com/api/token'

# 	def __init__(self, client_id, client_secret, *args, **kwargs):
# 		super().__init__(*args, **kwargs)
# 		self.client_id = client_id
# 		self.client_secret = client_secret

# 	def get_client_credentials(self):
# 		# Returns a base64 encoded string
# 		client_id = self.client_id
# 		client_secret = self.client_secret
# 		if client_secret == None or client_id == None:
# 			raise Exception('Error: Client ID or Client Secret could not be found.')
# 		client_creds = f'{client_id}:{client_secret}'
# 		client_creds_b64 = base64.b64encode(client_creds.encode())
# 		return client_creds_b64.decode()

# 	def get_token_headers(self):
# 		# Basic <base64 encoded client_id:client_secret>	
# 		client_creds_b64 = self.get_client_credentials()
# 		return {
# 			'Authorization': f'Basic {client_creds_b64}'
# 		}

# 	def get_token_data(self):
# 		return {
# 			'grant_type': 'client_credentials'
# 		}

# 	def perform_auth(self):
# 		token_url = self.token_url
# 		token_data = self.get_token_data()
# 		token_headers = self.get_token_headers()
# 		r = requests.post(token_url, data=token_data, headers=token_headers)
# 		if r.status_code not in range(200,299):
# 			raise Exception('Could not authenticate client.')
# 		data = r.json()
# 		now = datetime.datetime.now()
# 		access_token = data['access_token']
# 		expires_in = data['expires_in']
# 		expires = now + datetime.timedelta(seconds=expires_in)
# 		self.access_token = access_token
# 		self.access_token_expires = expires
# 		self.access_token_did_expire = expires < now
# 		return True

# 	def get_access_token(self):
# 		token = self.access_token
# 		expires = self.access_token_expires
# 		now = datetime.datetime.now()
# 		if expires < now or token == None:
# 			self.perform_auth()
# 			return self.get_access_token()
# 		return token

# 	def get_resource_headers(self):
# 		access_token = self.get_access_token()
# 		headers = {
# 			'Authorization': f'Bearer {access_token}'
# 		}
# 		return headers

# 	def get_resource(self, lookup_id, resource_type='albums', version='v1'):
# 		endpoint = f'https://api.spotify.com/{version}/{resource_type}/{lookup_id}'
# 		headers = self.get_resourse_headers()
# 		r = requests.get(enpoint, headers=headers)
# 		if r.status_code not in range(200, 299):
# 			return {}
# 		print(r.json())
# 		return r.json()

# 	def get_album(self, _id):
# 		return self.get_resource(_id, resource_type='albums')

# 	def get_artist(self, _id):
# 		return self.get_resource(_id, resource_type='artists')


# 	def base_search(self, query_params):
# 		headers = self.get_resource_headers()
# 		endpoint = 'https://api.spotify.com/v1/search'
# 		lookup_url = f'{endpoint}?{query_params}'
# 		r = requests.get(lookup_url, headers=headers)
# 		if r.status_code not in range(200, 299):
# 			return {}
# 		print(r.json())
# 		return r.json()

# 	def search(self, query=None, operator=None, operator_query=None, search_type='artist'):
# 		if query == None:
# 			raise Exception('A query is required.')
# 		if isinstance(query, dict):
# 			# Converts dict to list
# 			query = ' '.join([f'{k}:{v}' for k,v in query.items()])
# 		if operator != None and operator_query != None:
# 			if operator.lower() == 'or' or operator.lower() == 'not':
# 				operator = operator.upper()
# 				if isinstance(operator_query, str):
# 					query = f'{query} {operator} {operator_query}'
# 		# Converts a dictionary into a URL-ready string
# 		query_params = urlencode({'q': query, 'type': search_type.lower()})
# 		print(query_params)
# 		return self.base_search(query_params)



# # ---Spotify client---	
# method = 'POST'
# client_id = 'f6d4f8e2d7934b1cbaac6f700261bcbf'
# client_secret = #hidden

# spotify = SpotifyAPI(client_id, client_secret)
# spotify.search({'track': 'Make It Wit Chu'}, search_type='track')






