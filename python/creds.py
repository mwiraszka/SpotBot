# Client ID and Secret credentials for SpotBot
import os
 
def get_creds():
	USER_ID = 'spotify:user:wiraadam'
	SPOTIPY_CLIENT_ID = os.environ['SPOTIFY_CLIENT_ID']
	SPOTIPY_CLIENT_SECRET = os.environ['SPOTIFY_CLIENT_SECRET']
	SPOTIPY_REDIRECT_URI = 'https://www.spotify.com'
	return  USER_ID, SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET, SPOTIPY_REDIRECT_URI