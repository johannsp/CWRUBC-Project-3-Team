import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import HomePage from "./pages/homepage";
import AddLesson from "./pages/add-lesson";
import "./App.css";

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
            <Route exact path="/addlesson">
              <AddLesson />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
