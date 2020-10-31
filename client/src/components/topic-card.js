//Under construction

import React from "react";
import { Button, Card } from 'react-bootstrap';

/* {{{ **
** import React, {useState} from "react";
** import { Container, Form, Button, Col, Card } from 'react-bootstrap';
** }}} */

function TopicCard(props) {
  return(
    <Card className="m-3">
      <p className="m-1">{props.title}</p>
      <p className="m-1">{props.time}</p>
      <Card.Body>
        <p className="m-1">{props.notes}</p>
      </Card.Body>
      <Button className="m-1">START</Button>
      <Button className="m-1">START</Button>
    </Card>
  )
}

export default TopicCard;
