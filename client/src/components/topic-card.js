import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Row } from 'react-bootstrap';
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
  const [viewOnly, setViewOnly] = useState(props.viewOnly);
  const titleRef = useRef(props.title);
  const durationRef = useRef(props.duration);
  const notesRef = useRef(props.notes);
  const history = useHistory();

  const deleteTopic = () => {
    if (id) {
      console.log("∞° deleteTopic...");
      API.deleteTopicById(id)
        .then( (res) => {
          setId(id);  // Resave in state hook in case we need it
          console.log("∞° id=\n", id);
          // Intentionally pass null for title as a trigger to filter
          // this topic out thus deleting it from state management
          props.setStateTopic(
            id,
            null,
            0,
            ""
          );
          props.setStateLessonTime();
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

  const editTopic = () => {
    setViewOnly(false);
    // Reset cleared values from props
    titleRef.current.value = props.title;
    durationRef.current.value = props.duration;
    notesRef.current.value = props.notes;
    console.log("∞° props.lessonId=\n", props.lessonId);
    console.log("∞° titleRef.current.value=\n", titleRef.current.value);
    console.log("∞° durationRef.current.value=\n", durationRef.current.value);
    console.log("∞° notesRef.current.value=\n", notesRef.current.value);
    return true;
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
    console.log("∞° topic  id=\n", id);
    // Make sure each value to store is valid and not empty
    if (!(data.title) || 0 === data.title.length)
    {
      setPrompt("Please enter topic");
      return;
    }
    if (!(data.duration))
    {
      setPrompt("Please enter how many minutes");
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
      API.updateTopicById(id,data)
        .then( (res) => {
          setId(id);  // Resave in state hook in case we need it
          // Sequelize update does not return the updated object,
          // so just store the update values from React to the
          // state management in App component.
          props.setStateTopic(
            id,
            titleRef.current.value,
            durationRef.current.value,
            notesRef.current.value
          );
          props.setStateLessonTime();
          setViewOnly(true);
        })
        .catch( (error) => {
          console.log(error);
        });
    }
    else {
      API.saveTopic(data)
        .then( (res) => {
          console.log("∞° saveTopic res=\n", res);
          console.log("∞° props=\n", props);
          props.setStateTopic(
            res.data.id,
            res.data.title,
            res.data.duration,
            res.data.notes
          );
          titleRef.current.value = "";
          durationRef.current.value = 0;
          notesRef.current.value = "";
          props.setStateLessonTime();
        })
        .catch( (error) => {
          console.log(error);
        });
    }
  };

  const title = () => {
    const retVal = props.title || "Topic";
    return retVal;
  }

  const duration = () => {
    const retVal = props.duration || "How many minutes";
    return retVal;
  }

  const notes = () => {
    const retVal = props.notes || "Notes";
    return retVal;
  }

  return(
    <Card className="m-3">
      <form className="form" onSubmit={handleSubmit}>
        <Row>
          <Col>
          {id
            ? <span>Id: {id}</span>
            : ""
          }
          <input
            disabled={viewOnly}
            ref={titleRef}
            type="text"
            placeholder={title()}
          />
          <input
            disabled={viewOnly}
            ref={durationRef}
            type="text"
            placeholder={duration()}
          />
          <Card.Body>
            <textarea
              disabled={viewOnly}
              ref={notesRef}
              placeholder={notes()}
            />
          </Card.Body>
          {/* Save button is hidden when data input is view only */}
          {viewOnly
            ? ""
            : <Button variant="secondary" type="submit" >Save</Button>
          }
          </Col>
        </Row>
        <Row>
          <Col>
          {/* Start button is hidden if id is null or otherwise invalid */}
          {/* or if start button functionality is not enabled         */}
          {props.id && props.canStart
            ? <Button variant="secondary" onClick={startLesson}>Start</Button>
            : ""
          }
          </Col>

          <Col>
          {/* Back button is hidden if id is null or otherwise invalid */}
          {/* or if back button functionality is not enabled         */}
          {/* BE SURE to pass a valid backMethod prop when using it! */}
          {props.id && props.showBack
            ? <Button variant="secondary" onClick={props.backMethod}>Back</Button>
            : ""
          }
          </Col>

          <Col>
          {/* Next button is hidden if id is null or otherwise invalid */}
          {/* or if next button functionality is not enabled         */}
          {/* BE SURE to pass a valid nextMethod prop when using it! */}
          {props.id && props.showNext
            ? <Button variant="secondary" onClick={props.nextMethod}>Next</Button>
            : ""
          }
          </Col>

          <Col>
          {/* Edit button is hidden if id is null or otherwise invalid */}
          {/* or if edit button functionality is not enabled         */}
          {/* or if not currently in view mode anymore               */}
          {props.id && props.canEdit && viewOnly
            ? <Button variant="secondary" onClick={editTopic}>Edit</Button>
            : ""
          }
          </Col>

          <Col>
          {/* Delete button is hidden if id is null or otherwise invalid */}
          {/* or if delete button functionality is not enabled         */}
          {props.id && props.canDelete
            ? <Button variant="secondary" onClick={deleteTopic}>Delete</Button>
            : ""
          }
          </Col>
        </Row>
      </form>
      <p>{prompt}</p>
    </Card>
  )
}

export default TopicCard;
