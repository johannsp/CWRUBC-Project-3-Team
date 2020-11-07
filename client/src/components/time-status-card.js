import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from 'react-bootstrap';

function TimeStatusCard(props) {
  const [status, setStatus] = useState("stopped");
  const [minDisplay, setMinDisplay] = useState("00");
  const [secDisplay, setSecDisplay] = useState("00");
  const [secsElapsed, setSecsElapsed] = useState(props.secondsElapsed);

  useEffect(() => {
    let interval = null;
    // Respond to changes in status
    if (status === "running") {
      interval = setInterval(function() {
        setSecsElapsed(secsElapsed => secsElapsed + 1);
        renderTime();
      }, 1000);
    } 
    else if (status === "paused") {
      clearInterval(interval);
    } else if (status === "stopped") {
      clearInterval(interval);
      setSecsElapsed(0);
    }
    // Return a function to perform cleanup as needed.
    return () => {
      clearInterval(interval); // Clear timer
    }
  }, [status, secsElapsed]);

  function getFormattedMinutes() {
    let seconds = secsElapsed;
    let minutes = Math.floor(seconds / 60);
    let formattedMinutes;
    if (minutes< 10) {
      formattedMinutes = "0" + minutes;
    } else {
      formattedMinutes = minutes;
    }
    return formattedMinutes;
  }

  function getFormattedSeconds() {
    let secondsLeft = (secsElapsed) % 60;
    let formattedSeconds;
    if (secondsLeft < 10) {
      formattedSeconds = "0" + secondsLeft;
    } else {
      formattedSeconds = secondsLeft;
    }
    return formattedSeconds;
  }

  /* {{{ **
  ** function setTime() {
  **   if (interval !== null) {
  **     clearInterval(interval);
  **   }
  ** }
  ** }}} */

  function renderTime() {
    setMinDisplay(getFormattedMinutes());
    setSecDisplay(getFormattedSeconds());
  }

  function startTimer() {
    if (status !== "running") {
      setStatus("running");
      /* {{{ **
      ** setTime();
      ** interval = setInterval(function() {
      **   secsElapsed++;
      **   renderTime();
      ** }, 1000);
      ** }}} */
    }
  }

  function pauseTimer() {
    if (status === "running") {
      setStatus("paused");
      /* {{{ **
      ** if (interval !== null) {
      **   clearInterval(interval);
      ** }
      ** renderTime();
      ** }}} */
    }
  }

  function stopTimer() {
    if (status === "running") {
      setStatus("stopped");
      /* {{{ **
      ** secsElapsed = 0;
      ** setTime();
      ** renderTime();
      ** }}} */
    }
  }

  return (
    <Card className="pl-2">
      <Row className="mb-2">
        <Col>
        <p>The lesson clock is {status}</p>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col>
        <Button variant="secondary" onClick={startTimer}>Start</Button>
        </Col>
        <Col>
        <Button variant="secondary" onClick={pauseTimer}>Pause</Button>
        </Col>
        <Col>
        <Button variant="secondary" onClick={stopTimer}>Stop</Button>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col>
        <h4>{props.caption}</h4>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col>
        <span className="TargetTimeBefore">
        At topic start:<br />
        {props.targetTimeBefore}:00
        </span>
        </Col>

        <Col>
        <span className="ActualElapsedTime">
        Time spent:<br />
        {minDisplay}:{secDisplay}</span>
        </Col>

        <Col>
        <span className="TargetTimeAfter">
        At topic end:<br />
        {props.targetTimeAfter}:00
        </span>
        </Col>
      </Row>
    </Card>
  )
}

export default TimeStatusCard;
