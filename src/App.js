import React, { useState, useEffect } from 'react';
import './App.css';
import TypingText from './components/TypingText';

import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import axios from 'axios';

const App = () => {
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getText();
  }, []);

  const getText = () => {
    setLoading(true);
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/http://www.randomtext.me/api/gibberish/p-1/150-200'
      )
      .then(res => {
        setLoading(false);
        setText(removeChars(res.data.text_out.split(' ')));
      })
      .catch(err => console.log(err));
  };

  const removeChars = text => {
    const filtered = text.filter(word => {
      word.replace(' ', '');
      return !word.includes('<p>') && !word.includes('</p>');
    });
    return filtered;
  };

  return (
    <Card
      style={{
        maxWidth: '1000px',
        minHeight: '600px',
        margin: '10% auto',
        textAlign: 'center'
      }}
    >
      <h1 style={{ marginTop: '50px' }}>Speed Typing Test</h1>
      <h6>Type as many words as possible in 1 minute</h6>
      {!loading ? (
        <TypingText text={text} getText={getText} />
      ) : (
        <div style={{ margin: 'auto' }}>
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
        </div>
      )}
    </Card>
  );
};

export default App;
