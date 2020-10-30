import React, {useState} from "react";
import { Container, Form, Button, Col } from 'react-bootstrap';

class SignUp extends React.Component {
    state = {

    }

    handleChange = (event) => {

    }

    render() {
        return(
            <Container className="d-flex min-vh-100 justify-content-center align-items-center">
                <Col>
                <Form className="m-3">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                </Col>
            </Container>
        )
    }
}

export default SignUp;