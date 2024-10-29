import { useEffect } from 'react'; 
import useSound from 'use-sound';

const Key = ({ key_id, pressed, changeKeyState }) => {
  const [play] = useSound(
    '/marimba_sounds/'+ key_id + '.mp3',
    { volume: 1 },
  );

  useEffect(() => {
    if (pressed) {
      play();
    }
    // Code here will run after *every* render
  });

  const initialState = 'keys key-' + key_id;
  const activeState = initialState + ' key-pressed';

  return (
    <div
      id={key_id}
      className={pressed? activeState : initialState}
      onMouseDown={() => changeKeyState(true)}
      onMouseUp={() => changeKeyState(false)}>
    </div>
  );
}

export default Key;
