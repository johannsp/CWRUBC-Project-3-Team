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

  componentDidMount() {
    this.loadTopicsOnLessonPlan();
  }

  loadTopicsOnLessonPlan = () => {
    API.getAllTopicsByLessonId(this.props.lessonId)
      .then(res => {
        console.log("∞° res=\n", res);
        // Store raw array data into App state management
        this.props.setStateTopics(res.data);
        // Store the total duration for all topics in this lesson
        this.props.setStateLessonTime();
      })
      .catch(err => console.log(err));
  };

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
              <h3>Lesson ({this.props.lessonId}): {this.props.lessonTitle}</h3>
              <h3>{this.props.lessonDuration} minutes</h3>
              <h3>Teach the lesson</h3>
              <LessonCard
                setStateLesson={this.props.setStateLesson}
                setStateLessonTime={this.props.setStateLessonTime}
                viewOnly={true}
                canStart={true}
                canEdit={false}
                canDelete={false}
                id={this.props.lessonId}
                key={this.props.lessonId}
                title={this.props.lessonTitle}
                duration={this.props.lessonDuration}
              />
              <h3>List of Topics</h3>
              {this.props.topicsArray.map((topic) => {
                console.log("∞° topic=\n", topic);
                console.log("∞° topic.title=\n", topic.title);
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
                    id={topic.id}
                    key={topic.id}
                    title={topic.title}
                    duration={topic.duration}
                    notes={topic.notes}
                  />
                );
              })}
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LiveLesson;
