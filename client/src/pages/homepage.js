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
        this.props.setStateLesson(this.lessonData.id, this.lessonData.title);
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
              <Button
                variant="secondary"
              >Create Lesson Plan</Button>
            </Link>
            {this.state.lessonData.map((lessonPlan) => {
              console.log("∞° lessonPlan=\n", lessonPlan);
              console.log("∞° lessonPlan.title=\n", lessonPlan.title);
              return (
                <LessonCard
                  setStateLesson={this.props.setStateLesson}
                  viewOnly={true}
                  canStart={true}
                  canEdit={true}
                  canDelete={true}
                  id={lessonPlan.id}
                  key={lessonPlan.id}
                  title={lessonPlan.title}
                  duration={lessonPlan.duration}
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
