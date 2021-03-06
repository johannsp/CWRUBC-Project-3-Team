import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import authAPI from "../../utils/authAPI";



function Login() {
  const [email, setEmail] = useState( "" );
  const [password, setPassword] = useState( "" );
  const [prompt, setPrompt] = useState( "Please login or sign up" );

  const history = useHistory();

  // When the form is submitted, attempt to authenticate using the
  // supplied email and password
  function handleFormSubmit(event) {
    event.preventDefault();
    if (email && password) {
      authAPI.login(email, password)
        .then(() => {
          setPrompt("Okay, redirecting");
          /* Need to change pages here!!*/
          history.push("/home");
        })
        .catch(err => {
          setPrompt("Login failed; please try again");
          console.log(err)
        });
    }
  };

  return ( 
    <Container fluid className="d-flex min-vh-100 justify-content-center align-items-center">
      <Row>
        <Col lg={12}>
          <Jumbotron className="text-center p-5">
          <h2>Login</h2>
          <p>{prompt}</p>
          

          {/* Login Form */}
          <Form className="login">
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text-left">Email address</Form.Label>
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
            Login
            </Button>
          </Form>
          
          <br />
          <p>Or sign up <Link to="/signup">here</Link></p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  )
}

export default Login;
