import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Col, Row, Jumbotron } from "react-bootstrap";
import LessonCard from "../components/lesson-card";
import TopicCard from "../components/topic-card";
import TimeStatusCard from "../components/time-status-card";
import LessonAPI from "../utils/databaseLessonAPI";
import TopicAPI from "../utils/databaseTopicAPI";

class LiveLesson extends React.Component {
  state = {
    lessonId: null,
    currStatus: "classNoStatus",
    targetTimeBefore: 0,
    targetTimeAfter: 0,
    currIndex: null,
    currTopic: null,
    nextIndex: null,
    nextTopic: null
  };

  componentDidMount() {
    this.loadTopicsOnLessonPlan();
  }

  setCurrStatusOnCurrentCard = (elapsedMinutes, elapsedSeconds) => {
    const mins=parseInt(elapsedMinutes);
    const secs=parseInt(elapsedSeconds);
    if ((mins + secs) === 0) {
      this.setState({
        currStatus: "classNoStatus"
      });
    }
    else if (mins < this.state.targetTimeBefore) {
      this.setState({
        currStatus: "classAheadOfTime"
      });
    }
    else if ((mins === (this.state.targetTimeAfter - 1)) && (secs > 30)) {
      this.setState({
        currStatus: "classAtTime"
      });
    }
    else if (mins >= this.state.targetTimeAfter) {
      this.setState({
        currStatus: "classOverTime"
      });
    }
    else {
      this.setState({
        currStatus: "classOnTime"
      });
    }
    return true;
  }

  setCurrentTargetTimes = (topics, curr, next) => {
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
    if (this.state.currTopic) {
      /* {{{ **
      ** this.setCurrStatusOnCurrentCard(-1);
      ** }}} */
      return (
        <>
          <Row>
            <Col>
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
              classTime={this.state.currStatus}
            />
            </Col>
          </Row>

          <Row className="mb-2">
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
          classTime="classNoStatus"
        />
      );
    }
    else {
      return null;
    }
  };

  render() {
    // If the lessonId is lost, possibly on a reload then return to the home page
    if (!(this.props.lessonId)) {
      this.props.history.push("/home");
    }
    return (
      <Container className="d-flex">
        <Row>
          <Col>
            <Jumbotron>
            <Row>
              <Col>
                <Link to="/home">
                  <Button variant="secondary">Home Page</Button>
                </Link>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <h3>Lesson: {this.props.lessonTitle}</h3>
                <h3>Duration: {this.props.lessonDuration} minutes</h3>
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
                <h3>Teach the lesson</h3>
                <TimeStatusCard
                  secondsElapsed={0}
                  caption="Topic time goals and actual time spent"
                  targetTimeBefore={this.state.targetTimeBefore}
                  targetTimeAfter={this.state.targetTimeAfter}
                  setCurrStatus={this.setCurrStatusOnCurrentCard}
                />
                <h3>Current topic</h3>
                {this.currTopicJSX()}
                <h3>Next up topic</h3>
                {this.nextTopicJSX()}
              </Col>
            </Row>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LiveLesson;
