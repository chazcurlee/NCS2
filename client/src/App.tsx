import React from 'react';
import { useState} from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Details from './pages/Details';
import Home from './pages/Home';
import LoginSignUp from './pages/LoginSignUp';




const App: React.FC = () => {
  let [ darkMode, setDarkMode] = useState('background-dark')
  
 
  return (
    <div className={`App ${darkMode}`}>

      <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Routes>
        <Route path="/" element={< Home darkMode={darkMode}/>} />
        <Route path="details/:vin/:date" element={ <Details darkMode={darkMode}/>} />
        <Route path="login-signup" element={ <LoginSignUp darkMode={darkMode}/>} />
      </Routes>
     
    </div>
  );
}

export default App;
