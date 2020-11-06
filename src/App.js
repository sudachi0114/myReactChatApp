import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Sudachi React Chat App</h2>
        </div>
        <p> hello react app</p>
      </div>
    );
  }
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
