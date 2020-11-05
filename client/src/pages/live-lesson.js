import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Col, Row, Jumbotron } from "react-bootstrap";
import ProgTitle from "../components/prog-title";
import LessonCard from "../components/lesson-card";
import TopicCard from "../components/topic-card";
import API from "../utils/databaseTopicAPI";

/* {{{ **
** import React, { useState } from "react";
** import { Container, Form, Button, Col, Jumbotron } from "react-bootstrap";
** import TopicCard from "../components/topic-card";
** }}} */

class LiveLesson extends React.Component {
  state = {
    topicKeys: [],
    currIndex: null,
    currTopic: null,
    nextIndex: null,
    nextTopic: null
  };

  componentDidMount() {
    console.log("∞° In LiveLesson componentDidMount this.props=\n", this.props);
    this.loadTopicsOnLessonPlan();
  }

  loadTopicsOnLessonPlan = () => {
    console.log("∞° loadTopicsOnLessonPlan...");
    API.getAllTopicsByLessonId(this.props.lessonId)
      .then(res => {
        console.log("∞° In getAllTopicsByLessonId res=\n", res);
        // Store raw array data into App state management
        this.props.setStateTopics(res.data,() => {
          console.log("∞° After setStateTopics...");
          // Store the total duration for all topics in this lesson
          this.props.setStateLessonTime();
          // Generate an array with the list of keys in the topicsArray object
          // so two TopicPage components move item by item through the topics.
          console.log("∞° this.props.topicsArray=\n", this.props.topicsArray);
          const keyValues = Object.keys(this.props.topicsArray);
          const curr = keyValues.length >= 0 ? 0 : null;
          const next = keyValues.length >= 1 ? 1 : null;
          console.log("∞° keyValues=\n", keyValues);
          console.log("∞° curr=\n", curr);
          console.log("∞° next=\n", next);
          this.setState({
            topicKeys: keyValues,
            currIndex: curr,
            currTopic: curr ? this.props.topicsArray[keyValues[curr]] : null,
            nextIndex: next,
            nextTopic: next ? this.props.topicsArray[keyValues[next]] : null
          });
          console.log("∞° this.props.topicsArray=\n", this.props.topicsArray);
        });
      })
      .catch(err => console.log(err));
  };

  startTimer = () => {
    return true;
  };

  goToBackTopic = () => {
    // Scroll backward if possible to previous topic.
    if (this.currIndex > 0) {
      const next = this.currIndex;
      const curr = this.currIndex - 1;
      this.setState({
        currIndex: curr,
        currTopic: curr ? this.props.topicsArray[this.topicKeys[curr]] : null,
        nextIndex: next,
        nextTopic: next ? this.props.topicsArray[this.topicKeys[next]] : null
      });
    }
  };

  goToNextTopic = () => {
    // Scroll forward if possible to next topic; note that nextIndex
    // becomes null when currIndex is the last one.
    if (this.nextIndex) {
      const curr = this.nextIndex;
      const next = curr + 1 < this.topicKeys.length ? curr + 1 : null;
      this.setState({
        currIndex: curr,
        currTopic: curr ? this.props.topicsArray[this.topicKeys[curr]] : null,
        nextIndex: next,
        nextTopic: next ? this.props.topicsArray[this.topicKeys[next]] : null
      });
    }
  };

  currTopicJSX = () => {
    console.log("∞° LiveLesson currTopicJSX...");
    console.log("∞° this.state.currTopic=\n", this.state.currTopic);
    if (this.state.currTopic) {
      return (
        <TopicCard
          lessonId={this.props.lessonId}
          setStateLesson={this.props.setStateLesson}
          setStateLessonTime={this.props.setStateLessonTime}
          setStateTopic={this.props.setStateTopic}
          viewOnly={true}
          showBack={true}
          showNext={true}
          canEdit={false}
          canDelete={false}
          id={this.state.currTopic.id}
          key={this.state.currTopic.id}
          title={this.state.currTopic.title}
          duration={this.state.currTopic.duration}
          notes={this.state.currTopic.notes}
        />
      );
    }
    else {
      return null;
    }
  };

  nextTopicJSX = () => {
    console.log("∞° nextTopicJSX...");
    console.log("∞° this.state.nextTopic=\n", this.state.nextTopic);
    if (this.state.nextTopic) {
      return (
        <TopicCard
          lessonId={this.props.lessonId}
          setStateLesson={this.props.setStateLesson}
          setStateLessonTime={this.props.setStateLessonTime}
          setStateTopic={this.props.setStateTopic}
          viewOnly={true}
          showBack={true}
          backMethod={this.goToBackTopic}
          showNext={true}
          nextMethod={this.goToNextTopic}
          canEdit={false}
          canDelete={false}
          id={this.state.nextTopic.id}
          key={this.state.nextTopic.id}
          title={this.state.nextTopic.title}
          duration={this.state.nextTopic.duration}
          notes={this.state.nextTopic.notes}
        />
      );
    }
    else {
      return null;
    }
  };

              /* {{{ **
              ** <h3>List of Topics</h3>
              ** {this.props.topicsArray.map((topic) => {
              **   console.log("∞° topic=\n", topic);
              **   console.log("∞° topic.title=\n", topic.title);
              **   return (
              **     <TopicCard
              **       lessonId={this.props.lessonId}
              **       setStateLesson={this.props.setStateLesson}
              **       setStateLessonTime={this.props.setStateLessonTime}
              **       setStateTopic={this.props.setStateTopic}
              **       viewOnly={true}
              **       showBack={true}
              **       showNext={true}
              **       canEdit={false}
              **       canDelete={false}
              **       id={topic.id}
              **       key={topic.id}
              **       title={topic.title}
              **       duration={topic.duration}
              **       notes={topic.notes}
              **     />
              **   );
              ** })}
              ** }}} */

  render() {
    return (
      <Container className="d-flex min-vh-100 justify-content-center align-items-center">
        <Row>
          <Col>
            <ProgTitle />
            <Jumbotron>
              <Link to="/home">
                <Button variant="secondary">Home Page</Button>
              </Link>
              <br />
              <br />
              <br />
              <h3>Lesson (Id:{this.props.lessonId}) {this.props.lessonTitle}</h3>
              <h3>{this.props.lessonDuration} minutes</h3>
              <h3>Teach the lesson</h3>
              <Row>
                <Col>
                <Button
                  variant="secondary"
                  onClick={this.startTimer}
                >Start Timer</Button>
                </Col>
              </Row>

              <LessonCard
                setStateLesson={this.props.setStateLesson}
                setStateLessonTime={this.props.setStateLessonTime}
                refreshParent={null}
                viewOnly={true}
                canStart={false}
                canRevise={false}
                canEdit={false}
                canDelete={false}
                id={this.props.lessonId}
                key={this.props.lessonId}
                title={this.props.lessonTitle}
                duration={this.props.lessonDuration}
              />
              <h3>Current topic</h3>
              {this.currTopicJSX()}
              <h3>Next up topic</h3>
              {this.nextTopicJSX()}
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LiveLesson;
