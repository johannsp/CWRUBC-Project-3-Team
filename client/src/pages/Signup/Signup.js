import React, { useState } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import authAPI from "../../utils/authAPI";

function Signup() {
  const [formObject, setFormObject] = useState({
    email: "",
    password: ""
  })

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.email && formObject.password) {
      authAPI.signup(formObject.email, formObject.password)
        .then(() => setFormObject({
          email: "",
          password: ""
        }))
        .then({/* Need to change pages here!!*/})
        .catch(err => console.log(err));
    }
  };

  return (
    <Container>
      <Row>
        <Col size="md-6 md-offset-3">
          <Jumbotron>
          <h2>Sign Up Form</h2>
          </Jumbotron>

          {/* Signup Form */}
          <form className="signup">
            <Input
              onChange={handleInputChange}
              type="email"
              name="email-input"
              placeholder="Email"
              value={formObject.email}
            />
            <Input
              onChange={handleInputChange}
              type="password"
              name="password-input"
              placeholder="Password"
              value={formObject.password}
            />
            <FormBtn
              className="btn btn-default"
              onClick={handleFormSubmit}
            >
            Sign up
            </FormBtn>
            <div style="display: none" id="alert" className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span> <span className="msg"></span>
            </div>
            <button type="submit" class="btn btn-default">Sign Up</button>
          </form>
          
          <br />
          <p>Or log in <Link to="/login">here</Link></p>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup;
