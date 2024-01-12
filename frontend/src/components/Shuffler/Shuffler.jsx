import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Shuffler = () => {
  const { userToken,setUserToken } = useContext(AppContext);
  useEffect(() => {
    console.log(userToken);
    if (!userToken) {
      const url = window.location.href;
      const code = url.split('?code=')[1];
      axios.get(`http://localhost:4000/token?code=${code}`, {
      })
        .then((res) => {
          console.log(res.data)
          setUserToken(res.data.access_token)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, []);

  useEffect(() => {
    console.log(userToken);
    if (userToken) {
      axios.get(`http://localhost:4000/playback?token=${userToken}`)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [userToken]);




  return (
    <div>Shuffler</div>
  )
}

export default Shuffler