import React from 'react';
import './App.css';
import Navigation from './components/nav';
import UserLogin from './UserLogin/UserLogin'

function App() {
  return (
    <div className="App">
      <Navigation />
      <UserLogin />
    </div>
  );
}

export default App;


