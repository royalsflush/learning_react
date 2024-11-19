export const GAME_STATE = Object.freeze({
    NOT_STARTED: Symbol("not_started"),
    ACTIVE: Symbol("active"),
    WIN:  Symbol("win"),
    LOSE: Symbol("lose")
  });

function GameState(props) {
    function printState() {
      if (props.gameState === GAME_STATE.ACTIVE ||
          props.gameState === GAME_STATE.NOT_STARTED) {
        return "Go :)";
      } else if (props.gameState === GAME_STATE.WIN) {
        return "Yay safe :D";
      } else {
        return "Booom :(";
      }
    }
  
    return (
      <div className="gameState">
        <button onClick={props.handleClick}>
          {printState()}
        </button>
      </div>
    );
  }

  export default GameState;