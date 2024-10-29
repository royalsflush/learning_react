import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web'
import './App.css';
import Marimba from './Marimba.js';

function HappyBirthdayButton({ keys, changeKeyState }) {
  const [springs, api] = useSpring(() => ({
    from: { bottom: 800 },
  }))

  function balloonsGoUp() {
    api.start({
      from: {
        bottom: -800,
      },
      to: {
        bottom: 800,
      },
      config: {
        friction: 120,
      },
    })
  }

  function playHappyBirthday() {
    const tempo = 300;

    const sequence = [
      // "Happy birthday to you"
      ['fsharp3', 1],
      ['fsharp3', 1],
      ['a4', 2],
      ['fsharp3', 2],
      ['c5', 2],
      ['b5', 4],
      // "Happy birthday to you" (higher) 
      ['fsharp3', 1],
      ['fsharp3', 1],
      ['a4', 2],
      ['fsharp3', 2],
      ['d6', 2],
      ['c5', 4],
      // Happy birthday dear Nina
      ['fsharp3', 1],
      ['fsharp3', 1],
      ['fsharp5', 2],
      ['e5', 2],
      ['c5', 2],
      ['b5', 2],
      ['a4', 4],
      // Happy birthday to you
      ['esharp4', 1],
      ['esharp4', 1],
      ['e5', 2],
      ['c5', 2],
      ['d4', 2],
      ['c5', 4],
    ];
   
    let time= tempo * sequence[0][1];
    changeKeyState(keys, sequence[0][0], true);

    for (let i=1; i<sequence.length; i++) {
      // I'm adding this small delay between key up and next key down to
      // simulate the key press.
      setTimeout(function () {
        changeKeyState(keys, sequence[i-1][0], false);
      }, time-100);
      setTimeout(function () {
        changeKeyState(keys, sequence[i][0], true);
      }, time);
      time += tempo * sequence[i][1];
    }
    setTimeout(function() {
      changeKeyState(keys, sequence[sequence.length-1][0], false);
      balloonsGoUp();
    }, time);
  }

  return (
      <div>
      <button
        className="happy-button"
        onClick={playHappyBirthday}>Play happy birthday!</button>
      <animated.img
        src="/balloons.png"
        className="balloons-left"
        alt="balloons"
        style={{...springs}}
      /> 
      <animated.img
        src="/balloons.png"
        className="balloons-right"
        alt="balloons"
        style={{...springs}}
      /> 
      </div>
  );
}

function App() {
  const key_ids = [
    'esharp2', 'f2', 'a2', 'b3', 'c3', 'e3', 'fsharp3', 'g3', 'a4', 'd4',
    'esharp4', 'f4', 'g4', 'b5', 'c5', 'e5', 'fsharp5', 'a6', 'd6', 'esharp6',
    'f6' 
  ];

  function generateKeys() {
    return key_ids.map((k_id) => {
      return {
        id: k_id,
        pressed: false,
      };
    });
  }

  const [keys, setKeys] = useState(generateKeys());

  function changeKeyState(keys, key_id, pressed) {
    const newKeys = keys.map((k) => {
      if (k.id === key_id) {
        return {
          id: k.id,
          pressed: pressed,
        };
      } else {
        return k;
      }
    });
    setKeys(newKeys);
  }

  return (
    <div className="App">
      <Marimba keys={keys} changeKeyState={changeKeyState} />
      <HappyBirthdayButton keys={keys} changeKeyState={changeKeyState} / >
    </div>
  );
}

export default App;
