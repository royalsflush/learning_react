import './App.css';
import Marimba from './Marimba.js';

function playHappyBirthdayOnce() {
  const fsharp3 = document.getElementById('fsharp3');
  const a4 = document.getElementById('a4');
  const c5 = document.getElementById('c5');
  const b5 = document.getElementById('b5');
  const d6 = document.getElementById('d6');
  const fsharp5 = document.getElementById('fsharp5');
  const e5 = document.getElementById('e5');
  const esharp4 = document.getElementById('esharp4');
  const d4 = document.getElementById('d4');

  const tempo = 300;

  const sequence = [
    // "Happy birthday to you"
    [fsharp3, 1],
    [fsharp3, 1],
    [a4, 2],
    [fsharp3, 2],
    [c5, 2],
    [b5, 4],
    // "Happy birthday to you" (higher) 
    [fsharp3, 1],
    [fsharp3, 1],
    [a4, 2],
    [fsharp3, 2],
    [d6, 2],
    [c5, 4],
    // Happy birthday dear Nina
    [fsharp3, 1],
    [fsharp3, 1],
    [fsharp5, 2],
    [e5, 2],
    [c5, 2],
    [b5, 2],
    [a4, 4],
    // Happy birthday to you
    [esharp4, 1],
    [esharp4, 1],
    [e5, 2],
    [c5, 2],
    [d4, 2],
    [c5, 4],
  ];
 
  let time= tempo * sequence[0][1];
  sequence[0][0].click();

  for (let i=1; i<sequence.length; i++) {
    setTimeout(function () {
      sequence[i][0].click();
    }, time);
    time += tempo * sequence[i][1];
  }
}

function playHappyBirthday() {
  // Playing it twice makes it louder, which is good
  playHappyBirthdayOnce();
  playHappyBirthdayOnce();
}

function App() {
  return (
    <div className="App">
      <Marimba />
      <button
        className="happy-button"
        onClick={playHappyBirthday}>Play happy birthday!</button>
    </div>
  );
}

export default App;
