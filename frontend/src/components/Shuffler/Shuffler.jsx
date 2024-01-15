import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import './Shuffler.css';
import { Button } from '@mui/material';

const Shuffler = () => {
  const [userToken, setUserToken] = useState(null);
  const [playlist, setPlaylist] = useState('');
  const [songs, setSongs] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isDoneShuffling, setIsDoneShuffling] = useState(false);

  useEffect(() => {
    const fetchTokenAndPlayBack = async () => {
      try {
        if (!userToken) {
          const code = new URL(window.location.href).searchParams.get('code');
          const { data } = await axios.get(`http://localhost:4000/token?code=${code}`);
          setUserToken(data.access_token);

          const playbackResponse = await axios.get(`http://localhost:4000/playback?token=${data.access_token}`);
          setIsListening(true);
          handlePlaylist(playbackResponse.data, data.access_token);
        }
      } catch (error) {
        console.error(error);
        setIsListening(false);
      }
    };

    fetchTokenAndPlayBack();
  }, [userToken]);

  const handlePlaylist = async (playbackData, accessToken) => {
    if (playbackData && playbackData.context && playbackData.context.type === 'playlist') {
      const playlistId = playbackData.context.uri.split(':')[2];
      setPlaylist(playlistId);

      try {
        const { data } = await axios.get(`http://localhost:4000/getTracks?playlistId=${playlistId}&token=${accessToken}`);
        const trackUris = data.items.map(item => item.track.uri.split(':')[2]);
        setSongs(trackUris);

        const shuffledSongs = shuffle(trackUris);
        setIsDoneShuffling(false);
        await axios.post('http://localhost:4000/addQueue', {
          token: accessToken,
          songs: shuffledSongs
        })
          .then(setIsDoneShuffling(true));
      } catch (error) {
        console.error(error);
      }
    }
  };


  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  return (
    <div className='Shuffler'>
      <div className='Shuffler-header'>
        <Box display="flex" sx={{ width: '100%', backgroundColor: '#1DB954', borderRadius: '30px', height: '50%', alignItems: "center", justifyContent: 'center' }}>
          <h1>Spotify Shuffler</h1>
        </Box>
      </div>
      <div className="Instructions">
        <Box display="flex" sx={{ width: '100%', backgroundColor: '#1DB954', borderRadius: '30px', height: '50%', justifyContent: "center", flexDirection: "column" }}>
          <h2 >Instructions:</h2>
          <ol>1. Play a playlist on Spotify</ol>
          <ol>2. Click the shuffle button on this page</ol>
          <ol>3. Enjoy!</ol>
          <b6>The shuffled songs will be added to the queue, to reshuffle make sure to clear the queue in the app and click shuffle again</b6>
        </Box>
      </div>
      <div className= 'Shuffler-button'>
        <Button variant="contained" onClick={() => handlePlaylist(playlist, userToken)} disabled={!isListening || isDoneShuffling} sx={{ width: '100%', backgroundColor: '#1DB954', borderRadius: '30px', height: '50%', alignItems: "center", justifyContent: 'center' }}/>
      </div>
    </div>
  );
};

export default Shuffler;
