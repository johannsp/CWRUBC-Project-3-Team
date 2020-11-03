import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
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
  const [viewOnly, setViewOnly] = useState(props.viewOnly);
  const titleRef = useRef(props.title);
  const durationRef = useRef(props.duration);
  const history = useHistory();

  const deleteLesson = () => {
    if (id) {
      API.deleteLessonByID(id)
        .then( ( {id} ) => {
          setId(id);  // Resave in state hook in case we need it
        })
        .catch( (error) => {
          console.log(error);
        });
    }
  };

  const startLesson = () => {
    history.push("/livelesson");
    return true;
  };

  const editLesson = () => {
    setViewOnly(false);
    return true;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      title: titleRef.current.value,
      duration: durationRef.current.value,
    };
    console.log("∞° LessonCard submit: data=\n", data);
    console.log("∞° id=\n", id);
    // Make sure each value to store is valid and not empty
    if (!(data.title) || 0 === data.title.length)
    {
      setPrompt("Please enter lesson");
      return;
    }
    if (!(data.duration))
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

  const title = () => {
    const retVal = props.title || "Lesson";
    console.log("∞° retVal=\n", retVal);
    return retVal;
  }

  const duration = () => {
    const retVal = props.duration || "Amount of time";
    console.log("∞° retVal=\n", retVal);
    return retVal;
  }

  return(
    <Card className="m-3">
      <form className="form" onSubmit={handleSubmit}>
        <input
          disabled={viewOnly}
          ref={titleRef}
          name="LessonTitle"
          type="text"
          placeholder={title()}
        />
        {/* Lesson does not allow direct entry of total time */}
        <input
          disabled={true}
          ref={durationRef}
          name="lessonDuration"
          type="text"
          placeholder={duration()}
        />
        <Card.Body>
        </Card.Body>
        {/* Save button is hidden when data input is view only */}
        {viewOnly
          ? ""
          : <Button type="submit" >Save</Button>
        }
      </form>
      {/* Start button is hidden if id is null or otherwise invalid */}
      {/* or if start button functionality is not enabled         */}
      {props.id && props.canStart
        ? <Button onClick={startLesson}>Start</Button>
        : ""
      }
      {/* Edit button is hidden if id is null or otherwise invalid */}
      {/* or if edit button functionality is not enabled         */}
      {/* or if not currently in view mode anymore               */}
      {props.id && props.canEdit && viewOnly
        ? <Button onClick={editLesson}>Edit</Button>
        : ""
      }
      {/* Delete button is hidden if id is null or otherwise invalid */}
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
