import './App.css';
import useSound from 'use-sound';

function playHappyBirthday() {
  const fsharp3 = document.getElementById('fsharp3');
  const a4 = document.getElementById('a4');

  fsharp3.click();

  setTimeout(function() { fsharp3.click() 
    setTimeout(function() {
      a4.click()
        setTimeout(function() {
          fsharp3.click()
        }.bind(this), 700);
    }.bind(this), 400);
  }.bind(this), 400);
}

const Key = (props) => {
  const [play] = useSound('/marimba_sounds/'+ props.key_name + '.mp3');
  const clazz = 'keys key-'+props.key_name;

  return (
    <div
      id={props.key_name}
      className={clazz}
      onClick={play}>
    </div>
  );
}

function App() {
  return (
    <div className="App">
        <div className="marimba-container">
        <img
          className="marimba"
          src="./marimba.png"
          alt="marimba"
        />

        <Key key_name="esharp2" />
        <Key key_name="f2" />
        <Key key_name="a2" />
        <Key key_name="b3" />
        <Key key_name="c3" />
        <Key key_name="e3" />
        <Key key_name="fsharp3" />
        <Key key_name="g3" />
        <Key key_name="a4" />
        <Key key_name="d4" />
        <Key key_name="esharp4" />
        <Key key_name="f4" />
        <Key key_name="g4" />
        <Key key_name="b5" />
        <Key key_name="c5" />
        <Key key_name="e5" />
        <Key key_name="fsharp5" />
        <Key key_name="a6" />
        <Key key_name="d6" />
        <Key key_name="esharp6" />
        <Key key_name="f6" />
        </div>
      <button
        className="happy-button"
        onClick={playHappyBirthday}>Play happy birthday!</button>
    </div>
  );
}

export default App;
