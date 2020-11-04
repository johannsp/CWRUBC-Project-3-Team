import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Col, Row, Jumbotron } from "react-bootstrap";
import ProgTitle from "../components/prog-title";
import TopicCard from "../components/topic-card";
import API from "../utils/databaseTopicAPI";

/* {{{ **
** import React, { useState } from "react";
** import { Container, Form, Button, Col, Jumbotron } from "react-bootstrap";
** import TopicCard from "../components/topic-card";
** import API from "../utils/databaseTopicAPI";
** }}} */

class AddTopic extends React.Component {
  /* {{{ **
  ** // Setting the component's initial state
  ** state = {
  **   topicTitle: '',
  **   topicNotes: ''
  ** };
  ** }}} */

  /* {{{ **
  ** handleInputChange = event => {
  **   // Getting the value and name of the input which triggered the change
  **   let value = event.target.value;
  **   const name = event.target.name;
  ** 
  **   // Updating the input's state
  **   this.setState({
  **     [name]: value
  **   });
  ** };
  ** 
  ** handleFormSubmit = event => {
  **   // Preventing the default behavior of the form submit (which is to refresh the page)
  **   event.preventDefault();
  ** 
  **   // Store the topic title
  **   const data = {
  **     title: this.state.topicTitle
  **   };
  **   API.saveTopic(data)
  **     .then( () => {
  **       this.setState({
  **         topicTitle: "",
  **       });
  **     })
  **     .catch( (error) => {
  **       console.log(error);
  **     });
  ** };
  ** }}} */

  /* {{{ **
  ** handleChange = (event) => {};
  ** }}} */

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
        this.props.setStateLessonTime();
      })
      .catch(err => console.log(err));
    console.log("∞° exiting loadTopicsOnLessonPlan...");
  };

  render() {
    /* {{{ **
    ** <Jumbotron>
    **   {this.state.sampleData.map((topicTopic) => {
    **     return (
    **       <TopicCard
    **         title={topicTopic.topicTitle}
    **         time={topicTopic.topicTime}
    **         notes={topicTopic.topicNotes}
    **       />
    **     );
    **   })}
    ** </Jumbotron>
    ** }}} */
    /* {{{ **
    ** return (
    **   <Container className="d-flex min-vh-100 justify-content-center align-items-center">
    **     <Col>
    **       <Jumbotron>
    **         <h3>Add Topic</h3>
    **         <form className="form">
    **           <input
    **             value={this.state.topicTitle}
    **             name="topicTitle"
    **             onChange={this.handleInputChange}
    **             type="text"
    **             placeholder="Topic"
    **           />
    **           <textarea
    **             value={this.state.topicNotes}
    **             name="topicNotes"
    **             onChange={this.handleInputChange}
    **             placeholder="Notes"
    **           />
    **           <button onClick={this.handleFormSubmit}>Save</button>
    **         </form>
    **         <Button
    **           variant="secondary"
    **         >Save</Button>
    **       </Jumbotron>
    **     </Col>
    **   </Container>
    ** );
    ** }}} */
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
