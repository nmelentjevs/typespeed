import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styled from 'styled-components';

const Aligned = styled.div`
  margin: auto 0;
`;

const Results = ({ result: { wpm, apm, cpm }, restart, calculateAccuracy }) => (
  <Aligned>
    <Card>
      <Card.Body>
        <Card.Title>Your result:</Card.Title>
        <p>Words Per Minute: {wpm}</p>
        <p>Avg. Words Per Minute: {apm}</p>
        <p>Characters Per Minute: {cpm}</p>
        <p>Accuracy: {calculateAccuracy()} %</p>
        <Button onClick={() => restart()}>Try again?</Button>{' '}
      </Card.Body>
    </Card>
  </Aligned>
);

export default Results;
