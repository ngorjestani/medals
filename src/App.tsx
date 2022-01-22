import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar} from "./components/NavBar";
import {CountryList} from "./components/CountryList";

function App() {
  return (
    <div className="App">
        <Navbar />
        <CountryList />
    </div>
  );
}

export default App;
