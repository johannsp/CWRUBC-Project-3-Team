import React from "react";
import { Jumbotron, Col, Row, Container } from "react-bootstrap";

function HomePage() {
  return (
    <Container fluid>
      <Row>
        <Col className="col-md-12">
          <Jumbotron>
            <h1>Coming soon...Cross Apps Homepage</h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
