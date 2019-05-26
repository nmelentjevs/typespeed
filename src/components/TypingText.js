import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styled from 'styled-components';

import Card from 'react-bootstrap/Card';
import Results from './Results';

const TypingText = ({ text, getText }) => {
  const [correct, setCorrect] = useState([]);
  let [currentWord, setCurrentWord] = useState('');
  let [letterCorrect, setLetterCorrect] = useState([]);
  let [count, setCount] = useState([]);
  let [inputWords, setInputWords] = useState([]);

  let [timer, setTimer] = useState(1);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [result, setResult] = useState({});

  useEffect(() => {
    let correctArray = [];
    text.map(word => {
      correctArray.push(0);
    });
    correctArray[0] = 'active';
    setCorrect(correctArray);
  }, [text]);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    const textbox = document.getElementById('text-input');
    if (textbox) {
      textbox.focus();
    }
    if (timer === 10) {
      setResult({
        wpm: Math.round((inputWords.length / timer) * 60),
        apm: Math.round((count / timer / 4.5) * 60),
        cpm: Math.round((count / timer) * 60)
      });
      setFinished(true);
    }
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [timer, started, setStarted, finished, setFinished]);

  function tick() {
    if (started) {
      setTimer(timer + 1);
    }
  }

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

  const restart = () => {
    getText();
    setFinished(false);
    setStarted(true);
    setTimer(0);
    setCount(0);
    setCurrentWord('');
    setInputWords([]);
  };

  const calculateAccuracy = () => {
    return (
      (correct.filter(result => {
        return result === true;
      }).length /
        (correct.filter(result => {
          return result === false;
        }).length +
          correct.filter(result => {
            return result === true;
          }).length)) *
      100
    ).toFixed(1);
  };

  return (
    <>
      <div
        style={{
          maxWidth: '1000px',
          margin: '150px auto 225px auto',
          // overflow: 'auto',
          maxHeight: '350px',
          lineHeight: '1.5rem',
          letterSpacing: '.5px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr'
        }}
        id="text-box"
      >
        <Card
          border="light"
          style={{
            width: '36rem',
            textAlign: 'center'
          }}
        >
          <Card.Body>
            <Card.Title>Words to type:</Card.Title>
            <p
              style={{
                fontSize: '1.1rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {correct
                .slice(inputWords.length, inputWords.length + 10)
                .map((result, i) =>
                  result === 'active' && text[inputWords.length + i] ? (
                    <span key={i}>
                      {text[inputWords.length + i]
                        .split('')
                        .map((letter, index) => (
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
                      {text[inputWords.length + i]}{' '}
                    </span>
                  )
                )}
            </p>
          </Card.Body>
        </Card>
        {/* <br /> */}
        <div>
          {started && !finished ? (
            <>
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
              <h3 id="ok">
                Words per minute: {Math.round((inputWords.length / timer) * 60)}{' '}
                per minute
              </h3>
              <h3 id="ok">
                Characters per minute : {Math.round((count / timer) * 60)}{' '}
              </h3>
              <h5>Time left: {61 - timer}</h5>
            </>
          ) : !finished ? (
            <Button variant="primary" onClick={() => setStarted(true)}>
              Start
            </Button>
          ) : (
            <Results
              result={result}
              restart={restart}
              calculateAccuracy={calculateAccuracy}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TypingText;
