import React from 'react';

import Button from 'react-bootstrap/Button';

const Results = ({ result: { wpm, apm, cpm }, restart, calculateAccuracy }) => (
  <>
    <div>
      <h3>Your result:</h3>
      <p>Words Per Minute: {wpm}</p>
      <p>Avg. Words Per Minute: {apm}</p>
      <p>Characters Per Minute: {cpm}</p>
      <p>Accuracy: {calculateAccuracy()} %</p>
    </div>
    <Button onClick={() => restart()}>Try again?</Button>{' '}
  </>
);

export default Results;
