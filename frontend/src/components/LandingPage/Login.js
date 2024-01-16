import React, {useEffect} from 'react'
import axios from 'axios'
import { useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleLogin = () => {
      axios.get(`${API_URL}/login`).then((res) => {
          window.location = res.data;
      });
  };
  

  return (
    <div className='w-1/2 h-1/6 flex align-center justify-center'>
      <button className='bg-spotifyGreen text-spotifyWhite font-bold py-2 px-4 rounded-full h-3/4 w-3/4 hover:bg-opacity-95 hover:text-spotifyBlack p-96"' onClick={handleLogin}>Login With Spotify</button>
    </div>
    );
  }
