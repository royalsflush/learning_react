import useSound from 'use-sound';
import { useState } from 'react'; 

const Key = (props) => {
  const [play, { sound }] = useSound(
    '/marimba_sounds/'+ props.key_name + '.mp3',
    { volume: 1 },
  );
  const initialState = 'keys key-'+props.key_name;
  const activeState = initialState + ' key-pressed';
  const [style, setStyle] = useState(initialState);

  function pressKey() {
    // Playing the same sound twice makes it louder, which is needed because
    // this is already the maximum volume for the API.
    sound.play();
    sound.play();

    // Need to add key-pressed class.
    setStyle(activeState);
  }
  function releaseKey() {
    // Need to remove key-pressed class.
    setStyle(initialState);
  }

  return (
    <div
      id={props.key_name}
      className={style}
      onMouseDown={pressKey}
      onMouseUp={releaseKey}>
    </div>
  );
}

export default Key;
