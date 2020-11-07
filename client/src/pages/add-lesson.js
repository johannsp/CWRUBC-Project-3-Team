import React from "react";
import { Container, Col, Row, Jumbotron } from "react-bootstrap";
import ProgTitle from "../components/prog-title";
import API from "../utils/databaseLessonAPI";

class AddLesson extends React.Component {
  // Setting the component's initial state
  state = {
    lessonTitle: ''
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

  render() {
    return (
      <Container className="d-flex min-vh-100 justify-content-center align-items-center">
        <Row>
          <Col>
            <Jumbotron>
              <ProgTitle />
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
        </Row>
      </Container>
    );
  }
}
export default AddLesson;
