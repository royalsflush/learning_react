import { useState, useEffect } from 'react';
import Board, { initialiseBoard } from './Board.js';
import './App.css';

const GAME_STATE = Object.freeze({
  NOT_STARTED: Symbol("not_started"),
  ACTIVE: Symbol("active"),
  WIN:  Symbol("win"),
  LOSE: Symbol("lose")
});

function BombCounter(props) {
  return <div className="tableUtils bombCounter">{props.bombCount}</div> 
}

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
    <div className="tableUtils gameState">
      <button onClick={props.handleClick}>
        {printState()}
      </button>
    </div>
  );
}

function Timer(props) {
  return <div className="timer">{props.timer}</div>;
}

function App() {
  const [boardSize, setBoardSize] = useState(10);
  const [bombCount, setBombCount] = useState(2);
  const [board, setBoard] = useState(initialiseBoard(boardSize, bombCount));
  const [gameState, setGameState] = useState(GAME_STATE.NOT_STARTED);
  const [timer, setTimer] = useState(0);
  
  var intervalCallback;

  function resetGame() {
    setTimer(0);
    setGameState(GAME_STATE.NOT_STARTED);
    setBoard(initialiseBoard(boardSize, bombCount));
  }

  function startGame() {
    intervalCallback = setInterval(() => {setTimer(timer => timer + 1)}, 1000);
    setGameState(GAME_STATE.ACTIVE);
  }

  function stopGame() {
    clearInterval(intervalCallback);
    setGameState(GAME_STATE.LOSE);
  }

  function onBoardFlag(x, y) {
    let newBoard = board.slice();
    newBoard[x][y].flagged = !board[x][y].flagged;
   
    if (newBoard[x][y].flagged) {
      setBombCount(bombCount => bombCount - 1)
    } else {
      setBombCount(bombCount => bombCount + 1)
    }
    setBoard(newBoard);
  }

  function splashBoard(newBoard, x, y) {
    const pos = [[1,0], [0,1], [-1, 0], [0,-1]];
    let queue = [[x,y]];

    while (queue.length > 0) {
      const cx = queue[0][0];
      const cy = queue[0][1];
      newBoard[cx][cy].clicked = true;
      queue.splice(0,1); // pop front.
      console.log(queue);

      for (let i=0; i<pos.length; i++) {
        let nx = cx+pos[i][0];
        let ny = cy+pos[i][1];

        if (nx<0 || nx>=newBoard.length) continue;
        if (ny<0 || ny>=newBoard[nx].length) continue;
        if (newBoard[nx][ny].clicked) continue;

        if (newBoard[nx][ny].content === '') {
          newBoard[nx][ny].clicked = true;
          queue.push([nx,ny]);
        } else if (newBoard[nx][ny].content !== 'B') {
          newBoard[nx][ny].clicked = true;
        }
      }
    }
  }

  function onBoardClick(x, y) {
    let newBoard = board.slice();

    if (gameState === GAME_STATE.NOT_STARTED) {
      startGame();
    }

    newBoard[x][y].clicked = true;
    if (board[x][y].content === 'B') {
      stopGame();
    }

    setBoard(newBoard);
  }


  return (
    <div className="App">
      <Board
          board={board}
          onFlag={onBoardFlag}
          onClick={onBoardClick}>
        <BombCounter bombCount={bombCount} />
        <GameState gameState={gameState} handleClick={resetGame} />
        <Timer gameState={gameState} timer={timer} setTimer={setTimer} />
      </Board>
    </div>
  );
}

export default App;
