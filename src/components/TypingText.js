import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';

import styled from 'styled-components';

const TypingText = ({ text }) => {
  const [correct, setCorrect] = useState([]);
  let [currentWord, setCurrentWord] = useState('');
  let [letterCorrect, setLetterCorrect] = useState([]);
  let [count, setCount] = useState([]);
  let [inputWords, setInputWords] = useState([]);

  useEffect(() => {
    let correctArray = [];
    text.map(word => {
      correctArray.push(0);
    });
    correctArray[0] = 'active';
    setCorrect(correctArray);
  }, [text]);

  const handleInput = e => {
    let letters = [];
    let letterResult = [];
    text[inputWords.length].split('').map(letter => letters.push(letter));
    setCurrentWord(e.target.value);
    letters.map((letter, i) => {
      letterResult.push(e.target.value.replace(' ', '')[i] === letters[i]);
    });
    setLetterCorrect(letterResult);
    setCount(characterCount(inputWords));
  };

  const onKeyDown = e => {
    const index = inputWords.length;
    // on space add word to current word list and compare to correct text
    if (e.keyCode === 32) {
      if (currentWord !== ' ') {
        setInputWords([...inputWords, currentWord.replace(' ', '')]);
      }
      setCurrentWord('');

      correct[index] = checkSpelling(
        [...inputWords, currentWord.replace(' ', '')][index],
        text[index]
      );

      correct[index + 1] = 'active';
    }

    // on backslash show previous typed word and remove last item from current word list

    if (e.keyCode === 8 && (e.target.value === ' ' || e.target.value === '')) {
      if (inputWords.length > 0) {
        setCurrentWord(inputWords[inputWords.length - 1] + ' ');
        inputWords.pop();
        setInputWords([...inputWords]);
      }
      correct[index] = 0;
      correct[index - 1] = 'active';
    }

    setCorrect([...correct]);
  };

  const checkSpelling = (inputword, originalword) => {
    return inputword === originalword;
  };

  const characterCount = wordsArray => {
    let total = 0;
    wordsArray.forEach(word => {
      total += word.split('').length;
    });
    return total;
  };

  return (
    <>
      <div
        style={{
          maxWidth: '500px',
          margin: '150px auto 225px auto',
          // overflow: 'auto',
          maxHeight: '350px',
          lineHeight: '1.5rem'
        }}
        id="text-box"
      >
        <p style={{ fontSize: '1.1rem' }}>
          {correct.map((result, i) =>
            result === 'active' && text[i] ? (
              <span key={i}>
                {text[i].split('').map((letter, index) => (
                  <span
                    key={index}
                    style={{
                      borderBottom:
                        letterCorrect[index] === true
                          ? 'green 2px solid'
                          : letterCorrect[index] === false
                          ? 'red 2px dashed'
                          : null
                    }}
                  >
                    {letter}
                  </span>
                ))}{' '}
              </span>
            ) : (
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
            )
          )}
        </p>
      </div>
      <Form.Group>
        <h4>Type here: </h4>
        <Form.Control
          onChange={e => handleInput(e)}
          onKeyDown={e => onKeyDown(e)}
          as="textarea"
          rows="1"
          value={currentWord}
          id="text-input"
          style={{ fontSize: '2rem' }}
        />
      </Form.Group>
      <h3 id="ok">Words typed: {inputWords.length} </h3>
      <h3 id="ok">Characters typed: {count} </h3>
    </>
  );
};

export default TypingText;
