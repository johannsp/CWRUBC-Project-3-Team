import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import NoMatch from "./pages/NoMatch";
import "./App.css";
/* {{{ **
** import Button from 'react-bootstrap/Button';
** }}} */

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path={["/", "/login"]}>
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </Router>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Coming Soon... Class Time App!
        </p>
      </div>
    );
  }
}

export default App;
