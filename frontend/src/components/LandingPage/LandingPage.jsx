import React from 'react'
import { Login } from './Login'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <div className='Header'>
        Shuffle Your Spotify FR
      </div>
      <Login />

      <div className='Subtext'>
        Unlocking All Of Your Playlist
      </div>
    </div>
  )
}

export default LandingPage