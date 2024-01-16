import React from 'react'
import { Login } from './Login'

const LandingPage = () => {
  return (
    <div className='w-full h-full flex flex-col font-sans justify-evenly items-center bg-spotifyBlack'>
      <div className='w-full text-center text-6xl text-spotifyGreen font-black'>
        Spotify Shuffler
      </div>
      <Login />

      <div className='w-1/2 text-center text-xl text-spotifyGreen font-bold'>
        Unlocking Your Whole Playlist
      </div>
    </div>
  )
}

export default LandingPage