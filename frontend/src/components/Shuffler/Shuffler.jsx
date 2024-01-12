import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Shuffler = () => {
  const [userToken, setUserToken] = useState(null);
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [playlist, setPlaylist] = useState('');
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    console.log(userToken);

    if (userToken === null) {
      const url = window.location.href;
      const code = url.split('?code=')[1];
      axios.get(`http://localhost:4000/token?code=${code}`, {
      })
        .then((res) => {
          console.log(res.data)
          if (userToken === null) {
            setUserToken(res.data.access_token)
            const access_token = res.data.access_token;
            axios.get(`http://localhost:4000/playback?token=${access_token}`)
              .then((res) => {
                console.log(res.data)
                setIsPlaylist(res.data.context.type === 'playlist');
                if (res.data.context.type === 'playlist') {
                  setPlaylist(res.data.context.uri.split(':')[2]);
                  axios.get(`http://localhost:4000/getTracks?playlistId=${res.data.context.uri.split(':')[2]}&token=${access_token}`)
                    .then((res) => {
                      console.log(res.data)
                      const items = (res.data.items.map((item) => {
                        return item.track.uri.split(':')[2]
                      }))
                      setSongs(items);
                      const shuffledSongs = shuffle(items);
                      console.log(shuffledSongs)
                      console.log(access_token)
                      axios.post('http://localhost:4000/addQueue', {
                        token: access_token,
                        songs: shuffledSongs
                      })
                        .then((res) => {
                          console.log(res.data)
                        })
                        .catch((err) => {
                          console.log(err)
                        })
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [userToken]);

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }




  return (
    <div>Shuffler</div>
  )
}

export default Shuffler