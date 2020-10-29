import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Col, Row, Container, Form, Button } from "react-bootstrap";
import authAPI from "../../utils/authAPI";

function Signup() {
  const [email, setEmail] = useState( "" );
  const [password, setPassword] = useState( "" );

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (email && password) {
      authAPI.signup(email, password)
        .then({/* Need to change pages here!!*/})
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col className="col-md-6 col-md-offset-3">
          <Jumbotron>
          <h2>Sign Up Form</h2>
          </Jumbotron>

          {/* Signup Form */}
          <Form className="signup">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={ e => setEmail(e.target.value) }
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={ e => setPassword(e.target.value) }
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button
              className="btn btn-default"
              onClick={handleFormSubmit}
            >
            Sign up
            </Button>
          </Form>
          
          <br />
          <p>Or log in <Link to="/login">here</Link></p>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup;
