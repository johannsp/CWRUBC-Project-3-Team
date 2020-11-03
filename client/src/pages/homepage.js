import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Col, Jumbotron } from "react-bootstrap";
import LessonCard from "../components/lesson-card";
import API from "../utils/databaseLessonAPI";

/* {{{ **
** import React, { useState } from "react";
** import { Link, useLocation } from "react-router-dom";
** import { Container, Button, Col, Jumbotron } from "react-bootstrap";
** import LessonCard from "../components/lesson-card";
** }}} */

class HomePage extends React.Component {
  state = {
    lessonData: []
  };

  handleChange = (event) => {};

  componentDidMount() {
    this.loadLessonPlan();
  }

  loadLessonPlan = () => {
    API.getAllLessons()
      .then(res => {
        this.setState({
          lessonData: res.data
        });
        console.log("∞° this.state.lessonData=\n", this.state.lessonData);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container className="d-flex min-vh-100 justify-content-center align-items-center">
        <Col>
          <Jumbotron>
            <Link to="/addlesson">
              <Button variant="secondary">Create Lesson Plan</Button>
            </Link>
            {this.state.lessonData.map((lessonPlan) => {
              return (
                <LessonCard
                  viewOnly={true}
                  canDelete={false}
                  id={lessonPlan.id}
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
