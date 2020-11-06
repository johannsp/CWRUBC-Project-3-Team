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
import API from "./utils/databaseLessonAPI";

class App extends Component {
  state = {
    lessonId: null,
    lessonTitle: '',
    lessonDuration: 0,
    topicsArray: []
  };
  
  // Update total time duration in lessons based on all topics
  setStateLessonTime = (apiLessonTotalTime) => {
    // If provided total lesson time is not zero then store
    // the provided, otherwise compute the total for all
    // topics under the current lesson
    if (apiLessonTotalTime) {
      this.setState({
        lessonDuration: apiLessonTotalTime
      });
    }
    else {
      const totalTime = this.state.topicsArray.reduce((acc, cur) => {
        // Negate and subtract to prevent conversion to string and concatenation
        acc -= -1 * cur.duration;
        return acc;
      }, 0);
      this.setState({
        lessonDuration: totalTime
      });
      if (this.state.lessonId) {
        const data = {
          id: this.state.lessonId,
          title: this.state.lessonTitle,
          duration: totalTime
        };
        console.log("∞° this.state.lessonId=\n", this.state.lessonId);
        console.log("∞° In setStateLessonTime data=\n", data);
        API.updateLessonById(this.state.lessonId,data)
          .then( (res) => {
            console.log("∞° res=\n", res);
            console.log("∞° res.data=\n", res.data);
          })
          .catch( (error) => {
            console.log(error);
          });
      };
    }
  };

  // Update lesson information on current lesson
  //
  // When lesson is set right before switching components, it is
  // important to wait for the state to be saved.  Provide access
  // to a third call back paramater that take no arguments. 
  setStateLesson = (id, title, cb) => {
    console.log("∞° In setStateLesson...");
    console.log("∞° id=\n", id);
    console.log("∞° title=\n", title);
    // Unless arg cb is provided as a reference to a function to use as a 
    // call back set local callback to a noop function;
    const noop = () => {};
    const callback = typeof cb === "function" ? cb : noop;
    this.setState({
      lessonId: id,
      lessonTitle: title
    }, callback());
  };

  // Populate topics information for current lesson
  setStateTopics = (apiTopicsArray) => {
    console.log("∞° HI, In setStateTopics apiTopicsArray=\n", apiTopicsArray);
    this.setState({
      topicsArray: apiTopicsArray
    });
    console.log("∞° A setStateTopics(), topicsArray=\n", this.state.topicsArray);
  };

  // Update one topic by id value within current lesson
  // or if title is null delete that row by filtering it out
  setStateTopic = (id, title, duration, notes) => {
    console.log("∞° In setStateTopic title=\n", title);
    console.log("∞° id=\n", id);
    const updateTopics = title
      ? this.state.topicsArray
      : this.state.topicsArray.filter((topic) => id !== topic.id); 
    console.log("∞° updateTopics=\n", updateTopics);
    if (title) {
      // Loop through so can stop early once the correct topic
      // is found and updated.
      let found = false;
      for (const topic of updateTopics) {
        found = id === topic.id
        if (found) { 
          topic.title = title;
          topic.duration = duration;
          topic.notes = notes;
          break;
        }
      }
      if (!found) {
        updateTopics.push({
          id: id,
          title: title,
          duration: duration,
          notes: notes
        });
      }
      console.log("∞° A updateTopics=\n", updateTopics);
    }
    this.setState({
      topicsArray: updateTopics
    });
    console.log("∞° A setStateTopic(), topicsArray=\n", this.state.topicsArray);
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
                  lessonId={this.state.lessonId}
                  lessonTitle={this.state.lessonTitle}
                  lessonDuration={this.state.lessonDuration}
                  topicsArray={this.state.topicsArray}
                  setStateLesson={this.setStateLesson}
                  {...props}
                />
              )}
            />
            <Route exact path="/addlesson"
              render={props => (
                <AddLesson
                  lessonId={this.state.lessonId}
                  lessonTitle={this.state.lessonTitle}
                  lessonDuration={this.state.lessonDuration}
                  topicsArray={this.state.topicsArray}
                  setStateLesson={this.setStateLesson}
                  {...props}
                />
              )}
            />
            <Route exact path="/addtopic"
              render={props => (
                <AddTopic
                  lessonId={this.state.lessonId}
                  lessonTitle={this.state.lessonTitle}
                  lessonDuration={this.state.lessonDuration}
                  topicsArray={this.state.topicsArray}
                  setStateLessonTime={this.setStateLessonTime}
                  setStateLesson={this.setStateLesson}
                  setStateTopics={this.setStateTopics}
                  setStateTopic={this.setStateTopic}
                  {...props}
                />
              )}
            />
            <Route exact path="/livelesson"
              render={props => (
                <LiveLesson
                  lessonId={this.state.lessonId}
                  lessonTitle={this.state.lessonTitle}
                  lessonDuration={this.state.lessonDuration}
                  topicsArray={this.state.topicsArray}
                  setStateLessonTime={this.setStateLessonTime}
                  setStateLesson={this.setStateLesson}
                  setStateTopics={this.setStateTopics}
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
