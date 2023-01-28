import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Details from "./pages/Details";
import Home from "./pages/Home";
import LoginSignUp from "./pages/LoginSignUp";

const App = () => {
  // States used to manage dark mode and the limited login feature
  let [darkMode, setDarkMode] = useState("background-dark");
  let [login, setLogin] = useState("Sign Up/Login");
  let [paperBg, setPaperBg] = useState("");

  // useEffecr to manage dark mode toggle and rerender
  useEffect(() => {
    if (darkMode === "background-dark") {
      setPaperBg("rgb(69, 68, 114, 0.5)");
    }
    if (darkMode === "background-light") {
      setPaperBg("rgb(40, 39, 66, .75)");
    }
  }, [darkMode]);

  return (
    <div className={`App ${darkMode}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} login={login} />
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route
          path="details/:vin/:date"
          element={<Details darkMode={darkMode} paperBg={paperBg} />}
        />
        <Route
          path="login-signup"
          element={
            <LoginSignUp paperBg={paperBg} login={login} setLogin={setLogin} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
