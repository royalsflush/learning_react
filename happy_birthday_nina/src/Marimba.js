import useSound from 'use-sound';


const Key = (props) => {
  const [play, { sound }] = useSound(
    '/marimba_sounds/'+ props.key_name + '.mp3',
    { volume: 1 },
  );
  function playKey() {
    // Playing the same sound twice makes it louder, which is needed because
    // this is already the maximum volume for the API.
    sound.play();
    sound.play();
  }
  const clazz = 'keys key-'+props.key_name;

  return (
    <div
      id={props.key_name}
      className={clazz}
      onClick={playKey}>
    </div>
  );
}

function Marimba() {
  return (
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
  );
}

export default Marimba;
