import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';

import styled from 'styled-components';

const TypingText = ({ text }) => {
  const [correct, setCorrect] = useState([]);
  const [letters, setLetters] = useState([]);
  const [inputWord, setInputWord] = useState('');
  let [currentWord, setCurrentWord] = useState('');
  let [testArray, setTestArray] = useState([]);
  const [background, setBackground] = useState(null);
  const [matched, setMatched] = useState(false);
  const [mistake, setMistake] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('1');
    console.log(text);
    let correctArray = [];
    text.map(word => {
      correctArray.push(0);
    });
    setCorrect(correctArray);
    text.map(word => {
      word.split('').map(letter => {
        letters.push(letter);
      });
    });
  }, [text]);

  useEffect(() => {
    setCount(1);
  }, [setCorrect, setCurrentWord, currentWord]);

  const handleInput = e => {
    setCurrentWord(e.target.value);
    setInputWord(e.target.value.split(' '));
    console.log(currentWord);
    console.log(testArray);
  };

  const onKeyDown = e => {
    const index = inputWord.length - 1;
    const textBox = document.getElementById('text-box');
    if (index % 5 === 0 && index !== 0) {
      textBox.scrollBy(0, 2, 5);
    }
    setCount(0);
    if (e.keyCode === 32) {
      setTestArray([...testArray, currentWord]);
      setCurrentWord('');
      correct[index] = checkSpelling(inputWord[index], text[index]);
      setCorrect([...correct]);
      // console.log(checkSpelling(inputWord[index], text[index]));
      // console.log(correct);
    }

    // if (e.keyCode === 8) {
    //   currentWord.splice(currentWord.length - 1, 1);
    // }

    // console.log(inputWord);
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
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <h4>Type here: </h4>
        <Form.Control
          onChange={e => handleInput(e)}
          onKeyDown={e => onKeyDown(e)}
          as="textarea"
          rows="2"
          // value={currentWord}
        />
      </Form.Group>
    </>
  );
};

export default TypingText;
