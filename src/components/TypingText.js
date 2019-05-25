import React from 'react';

const TypingText = ({ text }) => (
  <div
    style={{
      maxWidth: '1000px',
      margin: '0 auto',
      overflow: 'auto',
      maxHeight: '100px',
      lineHeight: '1.5rem',
      marginTop: '150px'
    }}
  >
    <p>{text.join(' ')}</p>
  </div>
);

export default TypingText;
