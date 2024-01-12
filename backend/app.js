const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 4000;
const axios = require('axios');
const querystring = require('querystring');
const dotenv = require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;



app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);


const REDIRECT_URI = 'http://localhost:3000/shuffler'; // Your Redirect URI

function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state';

  // Constructing the Spotify URL for authorization
  const spotifyAuthUrl = 'https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state
    });
    res.send(spotifyAuthUrl);
});

app.get('/token', (req, res) => {
    const code = req.query.code;
    
    axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        }
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(err => {
        res.send(err);
    });
});

app.get('/playback', (req, res) => {
    const token = req.query.token;
    axios.get('https://api.spotify.com/v1/me/player', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(err => {
        res.send(err);
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);
