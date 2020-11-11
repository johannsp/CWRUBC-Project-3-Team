import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Card, Col, Row, InputGroup } from 'react-bootstrap';
import API from "../utils/databaseTopicAPI";

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
          props.setStateLessonTime(0); // Recompute
        })
        .catch( (error) => {
          console.log(error);
        });
    }
  };

  const startLesson = () => {
    console.log("∞° startLesson...");
    console.log("∞° props.id=\n", props.id);
    console.log("∞° props.title=\n", props.title);
    // Store which lesson is selected in state management
    // then prepare to run the live lesson
    const id = props.id;
    const title = props.title;
    props.setStateLesson(id, title);
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
    else if (!(data.duration))
    {
      setPrompt("Please enter how many minutes");
      return;
    }
    else if (!(data.notes) || 0 === data.notes.length)
    {
      setPrompt("Please enter notes");
      return;
    }
    else {
      setPrompt("");
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
          props.setStateLessonTime(0); // Recompute
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
          props.setStateLessonTime(0); // Recompute
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

  const cardClassName = () => {
    return `m-3 ${props.classTime}`;
  }

  return (
    <Container className="d-flex justify-content-left align-items-left">
      <Card className={cardClassName()} style={{ width: "80vw" }}>
        <form className="form" onSubmit={handleSubmit}>
          <Row className="mb-2">
            <Col>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                Topic:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <input
                readOnly={viewOnly}
                ref={titleRef}
                type="text"
                placeholder={title()}
              />
            </InputGroup>

            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                Minutes:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <input
                readOnly={viewOnly}
                ref={durationRef}
                type="text"
                placeholder={duration()}
              />
            </InputGroup>

            <InputGroup>
              <textarea
                readOnly={viewOnly}
                ref={notesRef}
                placeholder={notes()}
                style={{minWidth: "100%"}}
              />
            </InputGroup>
            {/* Save button is hidden when data input is view only */}
            {viewOnly
              ? ""
              : <Button variant="secondary" type="submit" >Save</Button>
            }
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
            {/* Start button is hidden if id is null or otherwise invalid */}
            {/* or if start button functionality is not enabled         */}
            {props.id && props.canStart
              ? <Button variant="secondary" onClick={startLesson}>Start</Button>
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
        <p className="red">{prompt}</p>
      </Card>
    </Container>
  )
}

export default TopicCard;
