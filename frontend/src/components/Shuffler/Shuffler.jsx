import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Shuffler = () => {
  const [userToken, setUserToken] = useState(null);
  const [playlist, setPlaylist] = useState('');
  const [songs, setSongs] = useState([]);
  const [isListening, setIsListening] = useState(true);
  const [isDoneShuffling, setIsDoneShuffling] = useState(true);

  const fetchTokenAndPlayBack = async () => {
    try {
      if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
        setUserToken(localStorage.getItem('token'));

        const playbackResponse = await axios.get(`http://localhost:4000/playback?token=${localStorage.getItem('token')}`);
        console.log(playbackResponse.data)
        setIsListening(true);
        handlePlaylist(playbackResponse.data, localStorage.getItem('token'));
      }
      else if (!userToken) {
        const code = new URL(window.location.href).searchParams.get('code');
        const { data } = await axios.get(`http://localhost:4000/token?code=${code}`);
        setUserToken(data.access_token);
        localStorage.setItem('token', data.access_token);

      }
      else {
        const playbackResponse = await (await axios.get(`http://localhost:4000/playback?token=${userToken}`));
        console.log(userToken);
        setIsListening(true);
        handlePlaylist(playbackResponse.data, userToken);
      }
    } catch (error) {
      console.error(error);
      setIsListening(false);
      setTimeout(() => {
        setIsListening(true);
      }, [5000]);
    }
  };

  const handlePlaylist = async (playbackData, accessToken) => {
    if (playbackData && playbackData.context && playbackData.context.type === 'playlist') {
      const playlistId = playbackData.context.uri.split(':')[2];
      setPlaylist(playlistId);

      try {
        setIsDoneShuffling(false);
        const { data } = await axios.get(`http://localhost:4000/getTracks?playlistId=${playlistId}&token=${accessToken}`);
        const trackUris = data.items.map(item => item.track.uri.split(':')[2]);
        setSongs(trackUris);

        const shuffledSongs = shuffle(trackUris);
        await axios.post('http://localhost:4000/addQueue', {
          token: accessToken,
          songs: shuffledSongs
        })
          .then(setIsDoneShuffling(true));
      } catch (error) {
        console.error(error);
      }
    }
    else {
      setIsListening(false);
      setTimeout(() => {
        setIsListening(true);
      }, [5000]);
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
    <div className='w-full h-full flex flex-col font-sans justify-evenly items-center bg-spotifyBlack overflow-auto'>
      <div className='flex flex-col items-center justify-center h-1/4 bg-spotifyGreen w-4/5 mt-4 rounded-2xl min-h-233 overflow-auto'>
        <div className='text-spotifyWhite '>
          <h1 className='font-bold text-xl sm:text-3xl'>Shuffle Your Playlist!</h1>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center bg-spotifyGreen w-4/5 my-4 rounded-2xl p-4 overflow-auto'>
        <div className='text-spotifyWhite text-center'>
          <h1 className='text-md sm:text-lg md:text-2xl font-bold'>Instructions:</h1>
          <p className='font-medium text-sm my-1'>1. Open Spotify on your phone or computer</p>
          <p className='font-medium text-xs my-1 sm:text-base'>2. Play a playlist <span className='font-thin text-xs italic'>Can't be an album or liked songs</span></p>
          <p className='font-medium text-xs my-1 sm:text-base'>3. Click the shuffle button below on this page <span className='font-thin text-xs italic'>Shuffled songs are added to queue</span></p>
          <p className='font-medium text-xs my-1 sm:text-base'>4. Enjoy! <span className='font-thin text-xs italic'>For shuffle to work intentionally make sure your queue is clear</span></p>
          <span className='font-thin text-xs italic'>Unfortunately due to Spotify limiting the size of a queue only 50 songs in your playlist can be shuffled at a time</span>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center h-1/4 bg-spotifyGreen w-4/5 mt-4 rounded-2xl min-h-233 overflow-auto'>
        <p className={`text-spotifyWhite text-center font-medium text-base my-1 ${isListening ? 'hidden' : ''}`}>
          Please play a playlist on Spotify
        </p>
        <p className={`text-spotifyWhite text-center font-medium text-base my-1 ${isDoneShuffling ? 'hidden' : ''}`}>
          Shuffling...
        </p>
        <button
          className='bg-spotifyBlack text-spotifyWhite font-bold py-2 px-4 rounded-full h-3/4 w-1/2 hover:bg-opacity-95 hover:text-spotifyGreen md:text-2xl'
          onClick={fetchTokenAndPlayBack}
          
        >
          Shuffle
        </button>
      </div>

    </div>
  );
};

export default Shuffler;
