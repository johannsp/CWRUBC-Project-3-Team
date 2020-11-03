import React, { useRef, useState } from "react";
import { Button, Card } from 'react-bootstrap';
import API from "../utils/databaseTopicAPI";

/* {{{ **
** import React, {useState} from "react";
** import { Container, Form, Button, Col, Card } from 'react-bootstrap';
** }}} */

      /* {{{ **
      ** <p className="m-1">{props.title}</p>
      ** <p className="m-1">{props.time}</p>
      ** <Card.Body>
      **   <p className="m-1">{props.notes}</p>
      ** </Card.Body>
      **
      ** <Button className="m-1">START</Button>
      ** <Button className="m-1">START</Button>
      ** }}} */

function TopicCard(props) {
  const [id, setId] = useState(props.id);
  const [prompt, setPrompt] = useState(""); // Inform user of issues
  const titleRef = useRef(props.title);
  const durationRef = useRef(props.duration);
  const notesRef = useRef(props.notes);

  const deleteTopic = () => {
    if (id) {
      API.deleteTopicByID(id)
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
      duration: durationRef.current.value,
      notes: notesRef.current.value,
      LessonId: props.lessonId 
    };
    console.log("∞° TopicCard submit: data=\n", data);
    console.log("∞° id=\n", id);
    // Make sure each value to store is valid and not empty
    if (!(data.title) || 0 === data.title.length)
    {
      setPrompt("Please enter topic");
      return;
    }
    if (!(data.duration))
    {
      setPrompt("Please enter amount of time");
      return;
    }
    if (!(data.notes) || 0 === data.notes.length)
    {
      setPrompt("Please enter notes");
      return;
    }
    // When adding a new topic props.id should be null
    // otherwise update using the existing id value
    if (id) {
      API.updateTopicByID(id,data)
        .then( ( {id} ) => {
          setId(id);  // Resave in state hook in case we need it
        })
        .catch( (error) => {
          console.log(error);
        });
    }
    else {
      API.saveTopic(data)
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

  const notes = () => {
    const retVal = props.notes || "Notes";
    console.log("∞° retVal=\n", retVal);
    return retVal;
  }

  return(
    <Card className="m-3">
      <form className="form" onSubmit={handleSubmit}>
        <input
          disabled={props.viewOnly}
          ref={titleRef}
          name="topicTitle"
          type="text"
          placeholder={title()}
        />
        <input
          disabled={props.viewOnly}
          ref={durationRef}
          name="topicDuration"
          type="text"
          placeholder={duration()}
        />
        <Card.Body>
          <textarea
            disabled={props.viewOnly}
            ref={notesRef}
            name="topicNotes"
            placeholder={notes()}
          />
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
        ? <Button onClick={deleteTopic}>Delete</Button>
        : ""
      }
      <p>{prompt}</p>
    </Card>
  )
}

export default TopicCard;
