import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Card from 'react-bootstrap/Card';
import Results from './Results';

// Styles

import Centered from './styledComponents/Centered';
import Display from './styledComponents/Display';
import WordsColumn from './styledComponents/WordsColumn';

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
      return correctArray.push(0);
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
    if (timer === 30) {
      setResult({
        wpm:
          (Math.round(
            correct.filter(result => {
              return result === true;
            }).length
          ) /
            timer) *
          60,
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
      if (e.target.value.replace(' ', '')[i] === letters[i]) {
        letterResult.push(true);
      } else if (e.target.value.replace(' ', '')[i] === undefined) {
        letterResult.push(0);
      } else if (e.target.value.replace(' ', '')[i] !== letters[i]) {
        letterResult.push(false);
      }
      return null;
    });
    setLetterCorrect(letterResult);
    let correctWords = [];
    correct.map((word, i) => {
      if (word === true) {
        correctWords.push(inputWords[i]);
      }
      return null;
    });
    setCount(characterCount(correctWords));
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
    if (wordsArray !== []) {
      wordsArray.forEach(word => {
        total += word.split('').length;
      });
    }
    return total;
  };

  const restart = () => {
    setFinished(false);
    setStarted(true);
    setTimer(0);
    setCount(0);
    setCurrentWord('');
    setInputWords([]);
    setCorrect([]);
    getText();
  };

  const calculateAccuracy = () => {
    const accuracy = (
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

    if (accuracy === 'NaN') return 0;
    return accuracy;
  };

  return (
    <>
      <Display
        style={{
          maxWidth: '1000px',
          margin: '0 auto 225px auto',
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
            width: '20rem',
            textAlign: 'center'
          }}
        >
          <Card.Body>
            <Card.Title>Words to type:</Card.Title>
            <WordsColumn>
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
                                  ? 'red 2px solid'
                                  : 'lightblue 2px solid'
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
                            : null,
                        maxWidth: '200px',
                        alignSelf: 'center'
                      }}
                    >
                      {text[inputWords.length + i]}{' '}
                    </span>
                  )
                )}
              ...
            </WordsColumn>
          </Card.Body>
        </Card>
        {/* <br /> */}
        <div style={{ margin: 'auto 0', maxWidth: '20rem' }}>
          {started && !finished ? (
            <>
              <h5>Time left: {61 - timer}</h5>
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
              <h5 id="ok">
                Words per minute: {Math.round((inputWords.length / timer) * 60)}{' '}
                per minute
              </h5>
              <h5 id="ok">
                Characters per minute : {Math.round((count / timer) * 60)}{' '}
              </h5>
            </>
          ) : !finished ? (
            <Centered>
              <Button variant="primary" onClick={() => setStarted(true)}>
                Start
              </Button>
            </Centered>
          ) : (
            <Results
              result={result}
              restart={restart}
              calculateAccuracy={calculateAccuracy}
            />
          )}
        </div>
      </Display>
    </>
  );
};

export default TypingText;
