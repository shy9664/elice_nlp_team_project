import React, { Component } from 'react';
import './App.css';
import Navigation from './components/nav';
import UserLogin from './UserLogin/UserLogin'
import List from './routes/List';
import Read from './routes/Read';
import Write from './routes/Write';
import { Route } from 'react-router';
import Users from './Users';

function App() {
  return (
    <div className="App">
      <Navigation />
      <UserLogin />
      <Users />
    </div>
  );
}

export default App;



