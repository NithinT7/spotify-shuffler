import React from 'react'
import { Login } from './Login'
import logo from '../shufflplay-high-resolution-logo-transparent.png'

const LandingPage = () => {
  return (
    <div className='w-full h-full flex flex-col font-sans justify-evenly items-center bg-spotifyBlack'>
      <div className='w-full flex justify-center text-4xl text-spotifyGreen font-black md:text-6xl'>
        <img src={logo} alt='ShufflPlay Logo' className='w-1/2 lg:w-1/4' />
      </div>
      <Login />

      <div className='w-1/2 text-center text-xl text-spotifyGreen font-bold'>
        Unlocking Your Whole Playlist
      </div>
    </div>
  )
}

export default LandingPage