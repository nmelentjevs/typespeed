import React, { useState, useEffect } from 'react';
import './App.css';
import TypingWindow from './components/TypingWindow';
import TypingText from './components/TypingText';

import axios from 'axios';

const App = () => {
  const [text, setText] = useState([]);
  useEffect(() => {
    axios
      .get('https://cors-anywhere.herokuapp.com/https://litipsum.com/api')
      .then(res => setText(res.data.split(' ')))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <TypingText text={text} />
      <TypingWindow />
    </div>
  );
};

export default App;
