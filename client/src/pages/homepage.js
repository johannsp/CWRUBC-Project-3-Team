import React, { useState } from "react";
import { Container, Form, Button, Col, Jumbotron } from "react-bootstrap";
import LessonCard from "../components/lesson-card";

class HomePage extends React.Component {
  state = {
    sampleData: [
      {
        lessonTitle: "22.1 CS 101",
        lessonTime: "2:30",
      },
      {
        lessonTitle: "22.2 Algorithms",
        lessonTime: "3:00",
      },
    ],
  };

  handleChange = (event) => {};

  render() {
    return (
      <Container className="d-flex min-vh-100 justify-content-center align-items-center">
        <Col>
          <Jumbotron>
            <Button variant="secondary">Create Lesson Plan</Button>{" "}
            {this.state.sampleData.map((lessonPlan) => {
              return (
                <LessonCard
                  title={lessonPlan.lessonTitle}
                  time={lessonPlan.lessonTime}
                />
              );
            })}
          </Jumbotron>
        </Col>
      </Container>
    );
  }
}

export default HomePage;
