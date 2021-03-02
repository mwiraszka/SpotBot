const functions = require("firebase-functions");
var querystring = require('querystring');
var request = require('request');

var stateKey = '__session';

var clientId = functions.config().spotify.client_id; // Your client id
var clientSecret = functions.config().spotify.client_secret; // Your secret
var redirectUri = functions.config().spotify.redirect_uri; // Your redirect uri
var localRedirect = functions.config().spotify.local_redirect; // Local helper

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

exports.helloWorld = functions.https.onRequest((req, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});

exports.login = functions.https.onRequest((req, res) => {
    var state = generateRandomString(16);
    res.setHeader('Cache-Control', 'private');
    res.set('Set-Cookie', `__session=${state};`)

    console.log("Attempt to login for app clientId=" + clientId + " redirectUri=" + redirectUri + " with state=" + state);
    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state
      }));
});

exports.callback = functions.https.onRequest((req, res) => {
    // your application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies.session : null;
    console.log("Found callback code=" + code + " state=" + state);
    console.log("Found req data state=" + state + " storedState=" + storedState+ " stateKey=" + stateKey);
    if (state === null || state !== storedState) {
        console.error("Kick out of flow due to missing cookie state, allow for now.");
        // res.redirect(redirectUri + '/#' +
        //     querystring.stringify({
        //     error: 'state_mismatch'
        //     }));
    }
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        //TODO: example of serverside request with access token.
        // var options = {
        //   url: 'https://api.spotify.com/v1/me',
        //   headers: { 'Authorization': 'Bearer ' + access_token },
        //   json: true
        // };

        // // use the access token to access the Spotify Web API
        // request.get(options, function(error, response, body) {
        //   console.log(body);
        // });

        // pass the token to the browser to make requests from there
        res.redirect(localRedirect + '/?' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect(localRedirect + '/?' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
});

exports.refresh_token = functions.https.onRequest((req, res) => {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientecret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});
