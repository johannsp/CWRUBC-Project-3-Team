import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Col, Row, Jumbotron } from "react-bootstrap";
import ProgTitle from "../components/prog-title";
import LessonCard from "../components/lesson-card";
import API from "../utils/databaseLessonAPI";

class HomePage extends React.Component {
  state = {
    lessonData: []
  };

  componentDidMount() {
    this.loadLessonPlan();
  }

  loadLessonPlan = () => {
    API.getAllLessons()
      .then(res => {
        console.log("∞° res=\n", res);
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
        <Row>
          <Col>
            <ProgTitle />
            <Jumbotron>
              <Link to="/addlesson">
                <Button
                  variant="secondary"
                >Create Lesson Plan</Button>
              </Link>
              <br />
              <h3>List of Lessons</h3>
              {this.state.lessonData.map((lessonPlan) => {
                console.log("∞° lessonPlan=\n", lessonPlan);
                return (
                  <LessonCard
                    setStateLesson={this.props.setStateLesson}
                    setStateLessonTime={this.props.setStateLessonTime}
                    refreshParent={this.loadLessonPlan}
                    viewOnly={true}
                    canStart={true}
                    canRevise={true}
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
        </Row>
      </Container>
    );
  }
}

export default HomePage;
