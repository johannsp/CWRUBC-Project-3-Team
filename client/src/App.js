import React, { Component } from "react";
import SignUp from "./pages/sign-up";
import HomePage from "./pages/homepage";
import AddLesson from "./pages/add-lesson";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomePage/>
      </div>
    );
  }
}

export default App;
