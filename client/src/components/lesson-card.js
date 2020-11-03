import React, { useRef, useState } from "react";
import { Button, Card } from 'react-bootstrap';
import API from "../utils/databaseLessonAPI";

/* {{{ **
** import React, {useState} from "react";
** import { Link } from "react-router-dom";
** import { Container, Form, Button, Col, Card } from 'react-bootstrap';
** }}} */

    /* {{{ **
    ** <Card className="m-3">
    **   <Card.Body>
    **     <p className="m-1">{props.title}</p>
    **     <p className="m-1">{props.time}</p>
    **     <Link to="/livelesson">
    **       <Button className="m-1">START</Button>
    **     </Link>
    **     <Button className="m-1">EDIT</Button>
    **     <Button className="m-1">DELETE</Button>
    **   </Card.Body>
    ** </Card>
    ** }}} */

function LessonCard(props) {
  const [id, setId] = useState(props.id);
  const [prompt, setPrompt] = useState(""); // Inform user of issues
  const titleRef = useRef(props.title);
  const timeRef = useRef(props.time);

  const deleteLesson = () => {
    if (id) {
      API.deleteLesson(id)
        .then( ( {id} ) => {
          setId(id);  // Resave in state hook in case we need it
        })
        .catch( (error) => {
          console.log(error);
        });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      title: titleRef.current.value,
      time: timeRef.current.value,
    };
    console.log("∞° LessonCard submit: data=\n", data);
    console.log("∞° id=\n", id);
    // Make sure each value to store is valid and not empty
    if (!(data.title) || 0 === data.title.length)
    {
      setPrompt("Please enter lesson");
      return;
    }
    if (!(data.time) || 0 === data.time.length)
    {
      setPrompt("Please enter amount of time");
      return;
    }
    // When adding a new lesson props.id should be null
    // otherwise update using the existing id value
    if (id) {
      API.updateLessonByID(id,data)
        .then( ( {id} ) => {
          setId(id);  // Resave in state hook in case we need it
        })
        .catch( (error) => {
          console.log(error);
        });
    }
    else {
      API.saveLesson(data)
        .then( ( {id} ) => {
          setId(id);  // Save in state hook in case we need it
        })
        .catch( (error) => {
          console.log(error);
        });
    }
  };

  return(
    <Card className="m-3">
      <form className="form" onSubmit={handleSubmit}>
        <input
          disabled={props.viewOnly}
          ref={titleRef}
          name="LessonTitle"
          type="text"
          placeholder="Lesson"
        />
        {/* Lesson does not allow direct entry of total time */}
        <input
          disabled={true}
          ref={timeRef}
          name="lessonTime"
          type="text"
          placeholder="Amount of time"
        />
        <Card.Body>
        </Card.Body>
        {/* Save button is hidden when data input is view only */}
        {props.viewOnly
          ? ""
          : <Button type="submit" >Save</Button>
        }
      </form>
      {/* Save button is hidden if id is null or otherwise invalid */}
      {/* or if delete button functionality is not enabled         */}
      {props.id && props.canDelete
        ? <Button onClick={deleteLesson}>Delete</Button>
        : ""
      }
      <p>{prompt}</p>
    </Card>
  )
}

export default LessonCard;
