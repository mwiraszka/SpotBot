const functions = require('firebase-functions')
let querystring = require('querystring')
let request = require('request')

let clientId = functions.config().spotify.client_id
let clientSecret = functions.config().spotify.client_secret
let redirectUri = functions.config().spotify.redirect_uri
let localRedirect = functions.config().spotify.local_redirect

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
generateRandomString = function(length) {
  let text = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return text
}

exports.login = functions.https.onRequest((_, res) => {
  const state = generateRandomString(16)
  res.setHeader('Cache-Control', 'private')
  res.set('Set-Cookie', `__session=${state};`)

  const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-public'

  res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state
  }))
})

exports.callback = functions.https.onRequest((req, res) => {
  const code = req.query.code || null
  // redirect_uri param needed?
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
    },
    form: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    json: true
  }

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.redirect(localRedirect)
      // res.redirect(localRedirect + '/?' + querystring.stringify({
      //     access_token: body.access_token,
      //     refresh_token: body.refresh_token
      // }))
    } else {
      res.redirect(localRedirect + '/?' + querystring.stringify({
          error: 'invalid_token'
      }))
    }
  })
})


// (Currently not implemented)
exports.refresh_token = functions.https.onRequest((req, res) => {
  // Request access token from refresh token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: req.query.refresh_token
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send({ 'access_token': body.access_token })
    }
  })
})
