import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Shuffler from './components/Shuffler/Shuffler';
import { createContext } from 'react';

export const AppContext = createContext();

function App() {

  return (
    <div className="w-full h-screen">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/shuffler" element={<Shuffler/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
