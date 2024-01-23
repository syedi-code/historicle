import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import EventData from './components/EventData';
import EventContainer from './components/EventContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header title="Historicle" />
      <EventContainer />
    </div>
  );
}

export default App;
