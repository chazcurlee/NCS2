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
  let [login, setLogin] = useState('Sign Up/Login')
  let [paperBg, setPaperBg] = useState('rgb(69, 68, 114, 0.5)')

  
 
  return (
    <div className={`App ${darkMode}`}>

      <Header darkMode={darkMode} setDarkMode={setDarkMode} login={login}/>
      <Routes>
        <Route path="/" element={< Home darkMode={darkMode}/>} />
        <Route path="details/:vin/:date" element={ <Details darkMode={darkMode}/>} />
        <Route path="login-signup" element={ <LoginSignUp darkMode={darkMode} login={login} setLogin={setLogin}/>} />
      </Routes>
     
    </div>
  );
}

export default App;
