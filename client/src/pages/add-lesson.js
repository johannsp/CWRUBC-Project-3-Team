//Under construction

import React, { useState } from "react";
import { Container, Form, Button, Col, Jumbotron } from "react-bootstrap";
import TopicCard from "../components/topic-card";

class AddLesson extends React.Component {
  state = {
    sampleData: [
      {
        topicTitle: "Basic Algorithms",
        topicTime: "15:00",
        topicNotes: "These are some notes for the topic I'm currently speaking about."
      },
      {
        topicTitle: "22.2 Algorithms",
        topicTime: "30:00",
        topicNotes: "Wow look here's more sample notes for this other topic!"
      },
    ],
  };

  handleChange = (event) => {};

  render() {
    return (
      <Container className="d-flex min-vh-100 justify-content-center align-items-center">
        <Col>
          <Jumbotron>
            {this.state.sampleData.map((lessonTopic) => {
              return (
                <TopicCard
                  title={lessonTopic.topicTitle}
                  time={lessonTopic.topicTime}
                  notes={lessonTopic.topicNotes}
                />
              );
            })}
          </Jumbotron>
        </Col>
      </Container>
    );
  }
}

export default AddLesson;
