import React from "react";
/* {{{ **
** import { Link } from "react-router-dom";
** }}} */
import { Container, Col, Jumbotron } from "react-bootstrap";
import API from "../utils/databaseLessonAPI";

/* {{{ **
** import React, { useState } from "react";
** import { Container, Form, Button, Col, Jumbotron } from "react-bootstrap";
** import TopicCard from "../components/topic-card";
** import API from "../utils/databaseLessonAPI";
** }}} */

  /* {{{ **
  ** state = {
  **   sampleData: [
  **     {
  **       topicTitle: "Basic Algorithms",
  **       topicTime: "15:00",
  **       topicNotes: "These are some notes for the topic I'm currently speaking about."
  **     },
  **     {
  **       topicTitle: "22.2 Algorithms",
  **       topicTime: "30:00",
  **       topicNotes: "Wow look here's more sample notes for this other topic!"
  **     },
  **   ],
  **   lessonTitle: '',
  **   savedId: -1
  ** };
  ** }}} */

class AddLesson extends React.Component {
  // Setting the component's initial state
  state = {
    lessonTitle: '',
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    // Store the lesson title
    const data = {
      title: this.state.lessonTitle
    };
    API.saveLesson(data)
      .then( (res) => {
        this.props.setStateLesson(res.data.id, res.data.title);
        console.log("∞° this.props=\n", this.props);
        this.props.history.push("/addtopic");
      })
      .catch( (error) => {
        console.log(error);
      });
  };

  /* {{{ **
  ** handleChange = (event) => {};
  ** }}} */

  render() {
    /* {{{ **
    ** <Jumbotron>
    **   {this.state.sampleData.map((lessonTopic) => {
    **     return (
    **       <TopicCard
    **         title={lessonTopic.topicTitle}
    **         time={lessonTopic.topicTime}
    **         notes={lessonTopic.topicNotes}
    **       />
    **     );
    **   })}
    ** </Jumbotron>
    ** }}} */
            /* {{{ **
            ** <Link to="/addtopic">
            **   <Button variant="secondary">Add Topic</Button>
            ** </Link>
            ** }}} */
    return (
      <Container className="d-flex min-vh-100 justify-content-center align-items-center">
        <Col>
          <Jumbotron>
            <h3>Add Lesson</h3>
            <form className="form">
              <input
                value={this.state.lessonTitle}
                name="lessonTitle"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Lesson Title"
              />
              <button onClick={this.handleFormSubmit}>Save</button>
            </form>
          </Jumbotron>
        </Col>
      </Container>
    );
  }
}
export default AddLesson;
