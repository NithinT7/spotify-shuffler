import React, {useEffect} from 'react'
import axios from 'axios'
import { useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
      axios.get('http://localhost:4000/login').then((res) => {
          window.location = res.data;
      });
  };
  

  return (
    <div className='Login'>
      <button onClick={handleLogin}>Login With Spotify</button>
    </div>
    );
  }
