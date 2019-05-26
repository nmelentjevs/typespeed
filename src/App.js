import React, { useState, useEffect } from 'react';
import './App.css';
import TypingWindow from './components/TypingWindow';
import TypingText from './components/TypingText';

import axios from 'axios';

const App = () => {
  const [text, setText] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/http://www.randomtext.me/api/gibberish/p-1/200-250'
      )
      .then(res => setText(removeChars(res.data.text_out.split(' '))))
      .catch(err => console.log(err));
  }, []);

  const removeChars = text => {
    console.log('ok');
    const filtered = text.filter(word => {
      word.replace(' ', '');
      return !word.includes('<p>') && !word.includes('</p>');
    });
    return filtered;
  };

  return <div className="App">{text !== [] && <TypingText text={text} />}</div>;
};

export default App;
