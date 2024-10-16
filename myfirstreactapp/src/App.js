import './App.css';

function handleClick() {
  alert('click');
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="marimba-container">
        <img
          className="marimba"
          onClick={handleClick}
          src="./marimba.png"
          alt="marimba"
          style={{"pointer-events": "all"}}
        />
        <div className="keys key-one"></div>
        <div className="keys key-two"></div>
        </div>
      </header>
      <button>Play happy birthday!</button>
    </div>
  );
}

export default App;
