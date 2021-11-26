import React, { Component } from 'react';
import './App.css';
import Navigation from './components/nav';
import UserLogin from './UserLogin/UserLogin'
import { Route } from 'react-router';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <Navigation />
      <UserLogin />
    </div>
  );
}

export default App;



