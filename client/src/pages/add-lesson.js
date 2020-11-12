import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Card, Col, Row, Jumbotron, InputGroup } from "react-bootstrap";
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
              <Card className="m-3" style={{ width: "80vw" }}>
                <Link to="/home">
                  <Button variant="secondary">Home Page</Button>
                </Link>
                <br />
                <h3>Add Lesson</h3>
                <form className="form mb-2">
                  <InputGroup>
                    <input
                      value={this.state.lessonTitle}
                      name="lessonTitle"
                      onChange={this.handleInputChange}
                      type="text"
                      size={50}
                      placeholder="Lesson Title"
                    />
                    <button onClick={this.handleFormSubmit}>Save</button>
                  </InputGroup>
                </form>
              </Card>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default AddLesson;
