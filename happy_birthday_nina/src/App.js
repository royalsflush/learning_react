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
  const [play] = useSound('/marimba_sounds/'+ props.key_name + '.wav');
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
          src="./marimba_structure.png"
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
        </div>
      <button
        className="happy-button"
        onClick={playHappyBirthday}>Play happy birthday!</button>
    </div>
  );
}

export default App;
