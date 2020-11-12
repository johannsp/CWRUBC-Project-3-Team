import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Card, Col, Row, InputGroup } from 'react-bootstrap';
import API from "../utils/databaseLessonAPI";

function LessonCard(props) {
  const [id, setId] = useState(props.id);
  const [prompt, setPrompt] = useState(""); // Inform user of issues
  const [viewOnly, setViewOnly] = useState(props.viewOnly);
  const titleRef = useRef(props.title);
  const durationRef = useRef(props.duration);
  const history = useHistory();

  const deleteLesson = () => {
    if (id) {
      API.deleteLessonById(id)
        .then( (res) => {
          console.log("∞° In deleteLessonById res=\n", res);
          setId(id);  // Resave in state hook in case we need it
          props.setStateLesson(null, "")
          // Only call refreshParent if a method was passed down
          if (props.refreshParent) {
            props.refreshParent();
          }
        })
        .catch( (error) => {
          console.log(error);
        });
    }
  };

  const startLesson = () => {
    const id=props.id
    const title=props.title
    // Store lesson id and title in state management and pass a call back
    // to wait for React to update state before jumping to a new component
    props.setStateLesson(id, title, () => {
      history.push("/livelesson");
    });
    return true;
  };

  const reviseLessonPlan = () => {
    console.log("∞° reviseLessonPlan...");
    // Pass up props to select this lesson before visiting /addtopic
    const id=props.id
    const title=props.title
    console.log("∞° id=\n", id);
    console.log("∞° title=\n", title);
    // Store lesson id and title in state management and pass a call back
    // to wait for React to update state before jumping to a new component
    props.setStateLesson(id, title, () => {
      history.push("/addtopic");
    });
    return true;
  };

  const editLesson = () => {
    setViewOnly(false);
    titleRef.current.value = props.title;
    durationRef.current.value = props.duration;
    return true;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      title: titleRef.current.value
    };
    console.log("∞° LessonCard submit: data=\n", data);
    console.log("∞° id=\n", id);
    // Make sure each value to store is valid and not empty
    if (!(data.title) || 0 === data.title.length)
    {
      setPrompt("Please enter lesson");
      return;
    }
    /* {{{ **
    ** if (typeof data.duration == "undefined" || data.duration == null)
    ** {
    **   setPrompt("Please enter amount of time");
    **   return;
    ** }
    ** }}} */
    else {
      setPrompt("");
    }
    // When adding a new lesson props.id should be null
    // otherwise update using the existing id value
    if (id) {
      API.updateLessonById(id,data)
        .then( (res) => {
          console.log("∞° In updateLessonById res=\n", res);
          setId(id);  // Resave in state hook in case we need it
          props.setStateLesson(data.id, data.title)
          setViewOnly(true);
        })
        .catch( (error) => {
          console.log(error);
        });
    }
    else {
      API.saveLesson(data)
        .then( (res) => {
          console.log("∞° In saveLesson res=\n", res);
          setId(id);  // Save in state hook in case we need it
          props.setStateLesson(data.id, data.title)
        })
        .catch( (error) => {
          console.log(error);
        });
    }
  };

  const title = () => {
    const retVal = props.title || "Lesson";
    return retVal;
  }

  const duration = () => {
    // Note, duration default to 0 so must explicitly check for bad iffy values
    const retVal = typeof props.duration !== "undefined" && props.duration !== null
      ? props.duration
      : "Amount of time";
    return retVal;
  }

  return (
    <Container className="d-flex justify-content-left align-items-left">
      <Card className="m-3" style={{ width: "80vw" }}>
        <form className="form mb-2" onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
              Lesson:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <input
              readOnly={viewOnly}
              ref={titleRef}
              name="LessonTitle"
              type="text"
              size={50}
              placeholder={title()}
            />
          </InputGroup>

          {/* Lesson does not allow direct entry of total time */}
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
              Minutes:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <input
              disabled={true}
              ref={durationRef}
              name="lessonDuration"
              type="text"
              size={10}
              placeholder={duration()}
            />
          </InputGroup>

          {/* Save button is hidden when data input is view only */}
          {viewOnly
            ? ""
            : <Button variant="secondary" type="submit" >Save</Button>
          }
        </form>

        <Row className="mb-2">
          {/* Edit button is hidden if id is null or otherwise invalid */}
          {/* or if edit button functionality is not enabled         */}
          {/* or if not currently in view mode anymore               */}
          {props.id && props.canEdit && viewOnly
            ? <Col><Button variant="secondary" onClick={editLesson}>Edit Lesson</Button></Col>
            : ""
          }

          {/* Delete button is hidden if id is null or otherwise invalid */}
          {/* or if delete button functionality is not enabled         */}
          {props.id && props.canDelete
            ? <Col><Button variant="secondary" onClick={deleteLesson}>Delete Lesson</Button></Col>
            : ""
          }
        </Row>

        <Row className="mb-2">
          {/* Start button is hidden if id is null or otherwise invalid */}
          {/* or if start button functionality is not enabled         */}
          {props.id && props.canStart
            ? <Col><Button variant="secondary" onClick={startLesson}>Ready to teach</Button></Col>
            : ""
          }

          {/* Revise button is hidden if id is null or otherwise invalid */}
          {/* or if edit button functionality is not enabled         */}
          {props.id && props.canRevise
            ? <Col><Button variant="secondary" onClick={reviseLessonPlan}>Review Topics</Button></Col>
            : ""
          }
        </Row>

        <p className="red">{prompt}</p>
      </Card>
    </Container>
  )
}

export default LessonCard;
