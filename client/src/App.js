import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import HomePage from "./pages/homepage";
import AddLesson from "./pages/add-lesson";
import AddTopic from "./pages/add-topic";
import LiveLesson from "./pages/live-lesson";
import "./App.css";

class App extends Component {
  state = {
    lessonId: null,
    lessonTitle: '',
    lessonDuration: 0,
    topicsArray: []
  };
  
  // Update total time duration in lessons based on all topics
  setStateLessonTime = () => {
    const totalTime = this.state.topicsArray.reduce((acc, cur) => {
      acc += cur.duration;
      return acc;
    }, 0);
    this.setState({
      lessonDuration: totalTime
    });
  };

  // Update lesson information on current lesson
  setStateLesson = (id, title) => {
    this.setState({
      lessonId: id,
      lessonTitle: title
    });
  };

  // Populate topics information for current lesson
  setStateTopics = (rawTopicsArray) => {
    const updateTopics = [];
    rawTopicsArray.forEach((topic, index) => {
      const idStr = topic.id.toString();
      updateTopics[idStr].id = topic.id;
      updateTopics[idStr].title = topic.title;
      updateTopics[idStr].duration = topic.duration;
      updateTopics[idStr].notes = topic.notes;
    });
    this.setState({
      topicsArray: updateTopics
    });
  };

  // Update one topic by id value within current lesson
  setStateTopic = (id, title, duration, notes) => {
    const idStr = id.toString();
    const updateTopics = this.state.topicsArray;
    updateTopics[idStr].id = id;
    updateTopics[idStr].title = title;
    updateTopics[idStr].duration = duration;
    updateTopics[idStr].notes = notes;
    this.setState({
      topicsArray: updateTopics
    });
  };

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
            {/* Note use of explicit render to enable props.history */}
            <Route exact path="/home"
              render={props => (
                <HomePage
                  lessonTitle={this.state.lessonTitle}
                  lessonId={this.state.lessonId}
                  topicsArray={this.state.topicsArray}
                  setStateLesson={this.setStateLesson}
                />
              )}
            />
            <Route exact path="/addlesson"
              render={props => (
                <AddLesson
                  lessonTitle={this.state.lessonTitle}
                  lessonId={this.state.lessonId}
                  topicsArray={this.state.topicsArray}
                  setStateLesson={this.setStateLesson}
                  {...props}
                />
              )}
            />
            <Route exact path="/addtopic"
              render={props => (
                <AddTopic
                  lessonTitle={this.state.lessonTitle}
                  lessonId={this.state.lessonId}
                  topicsArray={this.state.topicsArray}
                  setStateLesson={this.setStateLesson}
                  {...props}
                />
              )}
            />
            <Route exact path="/livelesson"
              render={props => (
                <LiveLesson
                  lessonTitle={this.state.lessonTitle}
                  lessonId={this.state.lessonId}
                  topicsArray={this.state.topicsArray}
                  setStateLesson={this.setStateLesson}
                  {...props}
                />
              )} />
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
