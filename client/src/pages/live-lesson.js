import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Col, Row, Jumbotron } from "react-bootstrap";
import ProgTitle from "../components/prog-title";
import LessonCard from "../components/lesson-card";
import TopicCard from "../components/topic-card";
import TimeStatusCard from "../components/time-status-card";
import LessonAPI from "../utils/databaseLessonAPI";
import TopicAPI from "../utils/databaseTopicAPI";

/* {{{ **
** import React, { useState } from "react";
** import { Container, Form, Button, Col, Jumbotron } from "react-bootstrap";
** import TopicCard from "../components/topic-card";
** }}} */

class LiveLesson extends React.Component {
  state = {
    lessonId: null,
    currIndex: null,
    currTopic: null,
    nextIndex: null,
    nextTopic: null
  };

  componentDidMount() {
    console.log("∞° In LiveLesson componentDidMount this.props=\n", this.props);
    this.loadTopicsOnLessonPlan();
  }

  setCurrentTargetTimes(topics, curr, next) {
    // Compute planned target times for the begining and ending of the
    // currently displayed topic, which can be compared to the actual
    // elapsed presentation time.
    let timeBefore = 0;
    let timeAfter  = 0;
    if (curr !== null) {
      for (let i = 0; i < curr; i++) {
        timeBefore += topics[i].duration;
      }
      timeAfter = timeBefore + topics[curr].duration;
    }
    this.setState({
      targetTimeBefore: timeBefore,
      targetTimeAfter: timeAfter
    });
  }

  loadTopicsOnLessonPlan = () => {
    console.log("∞° loadTopicsOnLessonPlan...");
    console.log("∞° this.props.lessonId=\n", this.props.lessonId);
    LessonAPI.getLessonById(this.props.lessonId)
      .then(res => {
        const lesson = res.data;
        console.log("∞° getLessonById then lesson=\n", lesson);
        // Store the lesson in state management
        this.props.setStateLesson(lesson.id, lesson.title);
        // Store the total duration for all topics in this lesson
        this.props.setStateLessonTime(lesson.duration);
        TopicAPI.getAllTopicsByLessonId(lesson.id)
          .then(res => {
            const topic = res.data;
            console.log("∞° In getAllTopicsByLessonId res=\n", res);
            // Store api-provided array data into App state management
            // Note there could be a timing issue with using the newly
            // stored topicsArray, so use the api-provided array here.
            this.props.setStateTopics(topic);
            console.log("∞° After setStateTopics...");
            const curr = topic.length > 0 ? 0 : null;
            const next = topic.length > 1 ? 1 : null;
            console.log("∞° curr=\n", curr);
            console.log("∞° next=\n", next);
            this.setCurrentTargetTimes(topic, curr, next);
            this.setState({
              lessonId: lesson.id,
              currIndex: curr,
              currTopic: curr !== null ? topic[curr] : null,
              nextIndex: next,
              nextTopic: next !== null ? topic[next] : null,
            });
            console.log("∞° this.props.topicsArray=\n", this.props.topicsArray);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  startTimer = () => {
    return true;
  };

  goToBackTopic = () => {
    console.log("∞° goToBackTopic...");
    // Scroll backward if possible to previous topic.
    if (this.state.currIndex > 0) {
      const next = this.state.currIndex;
      const curr = this.state.currIndex - 1;
      console.log("∞° next=\n", next);
      console.log("∞° curr=\n", curr);
      this.setCurrentTargetTimes(this.props.topicsArray, curr, next);
      this.setState({
        currIndex: curr,
        currTopic: curr !== null ? this.props.topicsArray[curr] : null,
        nextIndex: next,
        nextTopic: next !== null ? this.props.topicsArray[next] : null
      }, () => {
        console.log("∞° this.state.currTopic=\n", this.state.currTopic);
        console.log("∞° this.state.nextTopic=\n", this.state.nextTopic);
      });
    }
  };

  goToNextTopic = () => {
    console.log("∞° goToNextTopic...");
    // Scroll forward if possible to next topic; note that nextIndex
    // becomes null when currIndex is the last one.
    if (this.state.nextIndex) {
      const curr = this.state.nextIndex;
      const next = curr + 1 < this.props.topicsArray.length ? curr + 1 : null;
      console.log("∞° next=\n", next);
      console.log("∞° curr=\n", curr);
      this.setCurrentTargetTimes(this.props.topicsArray, curr, next);
      this.setState({
        currIndex: curr,
        currTopic: curr !== null ? this.props.topicsArray[curr] : null,
        nextIndex: next,
        nextTopic: next !== null ? this.props.topicsArray[next] : null
      }, () => {
        console.log("∞° this.state.currTopic=\n", this.state.currTopic);
        console.log("∞° this.state.nextTopic=\n", this.state.nextTopic);
      });
    }
  };

  currTopicJSX = () => {
    console.log("∞° LiveLesson currTopicJSX...");
    console.log("∞° this.state.currTopic=\n", this.state.currTopic);
    if (this.state.currTopic) {
      return (
        <>
          <TopicCard
            lessonId={this.props.lessonId}
            setStateLesson={this.props.setStateLesson}
            setStateLessonTime={this.props.setStateLessonTime}
            setStateTopic={this.props.setStateTopic}
            viewOnly={true}
            canEdit={false}
            canDelete={false}
            id={this.state.currTopic.id}
            key={`curr_${this.state.currTopic.id}`}
            title={this.state.currTopic.title}
            duration={this.state.currTopic.duration}
            notes={this.state.currTopic.notes}
          />
          <Row>
            <Col>
              <Button variant="secondary" onClick={this.goToBackTopic}>Back</Button>
            </Col>

            <Col>
              <Button variant="secondary" onClick={this.goToNextTopic}>Next</Button>
            </Col>
          </Row>
        </>
      );
    }
    else {
      return null;
    }
  };

  nextTopicJSX = () => {
    console.log("∞° LiveLesson nextTopicJSX...");
    console.log("∞° this.state.nextTopic=\n", this.state.nextTopic);
    if (this.state.nextTopic) {
      return (
        <TopicCard
          lessonId={this.props.lessonId}
          setStateLesson={this.props.setStateLesson}
          setStateLessonTime={this.props.setStateLessonTime}
          setStateTopic={this.props.setStateTopic}
          viewOnly={true}
          canEdit={false}
          canDelete={false}
          id={this.state.nextTopic.id}
          key={`next_${this.state.nextTopic.id}`}
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

              /* {{{ **
              ** <Button
              **   variant="secondary"
              **   onClick={this.startTimer}
              ** >Start Timer</Button>
              ** <Row>
              **   <Col>
              **   <span className="TargetTimeBefore">
              **   At topic start: {this.state.targetTimeBefore} mins
              **   </span>
              **   </Col>
              ** 
              **   <Col>
              **   <span className="ActualElapsedTime">
              **   Time spent: </span>
              **   </Col>
              ** 
              **   <Col>
              **   <span className="TargetTimeAfter">
              **   At topic end: {this.state.targetTimeAfter} mins
              **   </span>
              **   </Col>
              ** </Row>
              ** }}} */

  render() {
    // If the lessonId is lost, possibly on a reload then return to the home page
    if (!(this.props.lessonId)) {
      this.props.history.push("/home");
    }
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
              <br />
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
              <br />
              <h3>Teach the lesson</h3>
              <br />
              <TimeStatusCard
                secondsElapsed={0}
                caption="Time already used and planned time progress as of the current topic"
                targetTimeBefore={this.state.targetTimeBefore}
                targetTimeAfter={this.state.targetTimeAfter}
              />
              <br />
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
