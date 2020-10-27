import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from 'react-bootstrap/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Coming Soon... Class Time App!
        </p>
        <Button variant="primary">Test</Button>
      </div>
    );
  }
}

export default App;
