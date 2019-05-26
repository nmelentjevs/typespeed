import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';

import styled from 'styled-components';

const TypingText = ({ text }) => {
  const [correct, setCorrect] = useState([]);
  let [currentWord, setCurrentWord] = useState('');
  let [inputWords, setInputWords] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let correctArray = [];
    text.map(word => {
      correctArray.push(0);
    });
    setCorrect(correctArray);
  }, [text]);

  useEffect(() => {}, [count, currentWord, correct, setCorrect]);

  const handleInput = e => {
    setCurrentWord(e.target.value);
  };

  const onKeyDown = e => {
    // on space add word to current word list and compare to correct text
    if (e.keyCode === 32) {
      const index = inputWords.length;
      if (currentWord !== ' ') {
        setInputWords([...inputWords, currentWord.replace(' ', '')]);
      }
      setCurrentWord('');

      correct[index] = checkSpelling(
        [...inputWords, currentWord.replace(' ', '')][index],
        text[index]
      );

      setCorrect([...correct]);
    }

    // on backslash show previous typed word and remove last item from current word list

    if (e.keyCode === 8 && (e.target.value === ' ' || e.target.value === '')) {
      setCurrentWord(inputWords[inputWords.length - 1] + ' ');
      inputWords.pop();
      setInputWords([...inputWords]);
    }

    setCount(0);
  };

  const checkSpelling = (inputword, originalword) => {
    return inputword === originalword;
  };

  return (
    <>
      <div
        style={{
          maxWidth: '500px',
          margin: '150px auto 300px auto',
          // overflow: 'auto',
          maxHeight: '350px',
          lineHeight: '1.5rem'
        }}
        id="text-box"
      >
        <p>
          {correct.map((result, i) => (
            <span
              key={i}
              style={{
                borderBottom:
                  result === true
                    ? 'green 2px solid'
                    : result === false
                    ? 'red 2px dashed'
                    : null
              }}
            >
              {text[i]}{' '}
            </span>
          ))}
        </p>
      </div>
      <Form.Group>
        <h4>Type here: </h4>
        <Form.Control
          onChange={e => handleInput(e)}
          onKeyDown={e => onKeyDown(e)}
          as="textarea"
          rows="2"
          value={currentWord}
          id="text-input"
        />
      </Form.Group>
      <h3 id="ok">Word typed: {inputWords.length} </h3>
    </>
  );
};

export default TypingText;
