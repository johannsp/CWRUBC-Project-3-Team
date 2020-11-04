import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Jumbotron } from "react-bootstrap";

    /* {{{ **
    ** <Row>
    **   <Col>
    **     <Jumbotron>
    **       <h1>Class Time App</h1>
    **     </Jumbotron>
    **   </Col>
    ** </Row>
    ** }}} */

function ProgTitle() {
  return(
    <Jumbotron className="y-1 p-1">
      <h1>Class Time App</h1>
    </Jumbotron>
  )
}

export default ProgTitle;
