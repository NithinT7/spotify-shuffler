import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Shuffler from './components/Shuffler/Shuffler';
import { createContext } from 'react';

export const AppContext = createContext();

function App() {

  return (
    <div className="App">
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
