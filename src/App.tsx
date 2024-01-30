import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import EventData from './components/EventData';
import GameContainer from './components/GameContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header title="Historicle" />
      <GameContainer />
    </div>
  );
}

export default App;
