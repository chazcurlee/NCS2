import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Details from './pages/Details';
import Home from './pages/Home';
import LoginSignUp from './pages/LoginSignUp';




const App: React.FC = () => {
  
  
 
  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="details/:vin/:date" element={ <Details />} />
        <Route path="login-signup" element={ <LoginSignUp />} />
      </Routes>
     
    </div>
  );
}

export default App;
