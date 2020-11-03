import React from "react";
import { Container, Button, Col, Jumbotron } from "react-bootstrap";
import TopicCard from "../components/topic-card";
import API from "../utils/databaseTopicAPI";

/* {{{ **
** import React, { useState } from "react";
** import { Container, Form, Button, Col, Jumbotron } from "react-bootstrap";
** import TopicCard from "../components/topic-card";
** import API from "../utils/databaseTopicAPI";
** }}} */

class AddTopic extends React.Component {
  // Setting the component's initial state
  state = {
    topicTitle: '',
    topicNotes: ''
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

    // Store the topic title
    const data = {
      title: this.state.topicTitle
    };
    API.saveTopic(data)
      .then( () => {
        this.setState({
          topicTitle: "",
        });
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
        <Col>
          <Jumbotron>
            <h3>Add Topic</h3>
            <TopicCard
              viewOnly={false}
              canDelete={true}
              id={null}
              name=""
              time="0:00:00"
              notes=""
            />
          </Jumbotron>
        </Col>
      </Container>
    );
  }
}

export default AddTopic;
