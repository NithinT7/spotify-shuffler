import React, {useEffect} from 'react'

export const Login = () => {

  const CLIENT_ID = '436b5edd7352443eb28597ae8bdde1a6';
  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPES = ['user-read-private', 'user-read-email'];

  const getSpotifyAuthURL = () => {
    const url = new URL(AUTH_ENDPOINT);
    url.searchParams.append('client_id', CLIENT_ID);
    url.searchParams.append('redirect_uri', REDIRECT_URI);
    url.searchParams.append('response_type', RESPONSE_TYPE);
    url.searchParams.append('scope', SCOPES.join(' '));

    return url.toString();
  };
  const handleLogin = () => {
    window.location.href = getSpotifyAuthURL();
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('spotifyToken');

    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('spotifyToken', token);
    }

  }, []);
  return (
    <div className='Login'>

      <button onClick={handleLogin}>Login With Spotify</button>

    </div>
  )
}
