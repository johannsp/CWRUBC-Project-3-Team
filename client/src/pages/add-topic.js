import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Col, Row, Jumbotron } from "react-bootstrap";
import ProgTitle from "../components/prog-title";
import TopicCard from "../components/topic-card";
import API from "../utils/databaseTopicAPI";

class AddTopic extends React.Component {
  componentDidMount() {
    this.loadTopicsOnLessonPlan();
  }

  loadTopicsOnLessonPlan = () => {
    console.log("∞° loadTopicsOnLessonPlan...");
    console.log("∞° this.props.lessonId=\n", this.props.lessonId);
    API.getAllTopicsByLessonId(this.props.lessonId)
      .then(res => {
        console.log("∞° res=\n", res);
        // Store raw array data into App state management
        this.props.setStateTopics(res.data);
        // Store the total duration for all topics in this lesson
        this.props.setStateLessonTime(0); // Recompute
      })
      .catch(err => console.log(err));
    console.log("∞° exiting loadTopicsOnLessonPlan...");
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
              <h3>Lesson: {this.props.lessonTitle}</h3>
              <h3>Duration: {this.props.lessonDuration} minutes</h3>
              <br />
              <h3>Add Topic</h3>
              <TopicCard
                lessonId={this.props.lessonId}
                setStateLesson={this.props.setStateLesson}
                setStateLessonTime={this.props.setStateLessonTime}
                setStateTopic={this.props.setStateTopic}
                viewOnly={false}
                showBack={false}
                showNext={false}
                canEdit={false}
                canDelete={true}
                id={null}
                title=""
                duration={0}
                notes=""
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
                    showBack={false}
                    showNext={false}
                    canEdit={true}
                    canDelete={true}
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

export default AddTopic;
