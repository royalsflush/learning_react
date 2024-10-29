import Key from './Key.js';

function Marimba({ keys, changeKeyState }) {
  return (
    <div className="marimba-container">
        <img
          className="marimba"
          src="./marimba.png"
          alt="marimba"
        />

        {keys.map(key => (
            <Key
              key_id={key.id}
              pressed={key.pressed}
              changeKeyState={
                (pressed) => changeKeyState(keys, key.id, pressed)
              } />
        ))}
    </div>
  );
}

export default Marimba;
