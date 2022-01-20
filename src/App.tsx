import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar} from "./components/NavBar";
import {CountryCard} from "./components/CountryCard";

function App() {
  return (
    <div className="App">
      <Navbar />
        <CountryCard />
    </div>
  );
}

export default App;
