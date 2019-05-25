import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';

const TypingWindow = ({ handleInput }) => (
  <div>
    {' '}
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <h4>Type here: </h4>
      <Form.Control onChange={e => handleInput(e)} as="textarea" rows="5" />
    </Form.Group>
  </div>
);

export default TypingWindow;
