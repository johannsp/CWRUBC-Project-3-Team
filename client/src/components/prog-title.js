import React from "react";
import { Jumbotron } from "react-bootstrap";

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
