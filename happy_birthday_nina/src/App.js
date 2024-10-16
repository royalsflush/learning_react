import './App.css';

function App() {
  return (
    <div className="App">
        <div className="marimba-container">
        <img
          className="marimba"
          src="./marimba.png"
          alt="marimba"
          style={{"pointer-events": "all"}}
        />
        <div className="keys key-one"></div>
        <div className="keys key-two"></div>
        <div className="keys key-three"></div>
        <div className="keys key-four"></div>
        <div className="keys key-five"></div>
        </div>
      <button>Play happy birthday!</button>
    </div>
  );
}

export default App;
