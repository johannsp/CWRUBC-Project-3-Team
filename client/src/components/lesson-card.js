import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Col, Card } from 'react-bootstrap';

function LessonCard(props) {

    return(
        <Card className="m-3">
            <Card.Body>
                <p className="m-1">{props.title}</p>
                <p className="m-1">{props.time}</p>
                <Link to="/livelesson">
                    <Button className="m-1">START</Button>
                </Link>
                <Button className="m-1">EDIT</Button>
                <Button className="m-1">DELETE</Button>
            </Card.Body>
        </Card>
    )
}

export default LessonCard;