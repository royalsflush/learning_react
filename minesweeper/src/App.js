import { useState, useRef } from 'react';
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
  const [gameState, setGameState] = useState(GAME_STATE.NOT_STARTED);
  const [timer, setTimer] = useState(0);
  const [board, setBoard] = useState(() => {
    const initialState = initialiseBoard(boardSize, bombCount);
    return initialState;
  });
  let gameStartSeconds = useRef(Math.floor(Date.now()/1000));
  let intervalCallback = useRef(null);

  function resetGame() {
    console.log("Game reset");

    setTimer(0);
    setGameState(GAME_STATE.NOT_STARTED);
    let newBoard = initialiseBoard(boardSize, bombCount).slice();
    setBoard(newBoard);
  
    console.log(board);
  }

  function startGame() {
    console.log("Game started");
    gameStartSeconds.current = Math.floor(Date.now()/1000);

    intervalCallback.current = setInterval(() => {
      let timeNow = Math.floor(Date.now()/1000);
      setTimer(Math.floor(timeNow - gameStartSeconds.current));
    }, 1000, [gameStartSeconds]);

    console.log(intervalCallback);
    setGameState(GAME_STATE.ACTIVE);
  }

  function stopGame(newGameState) {
    console.log("Game ended");
    console.log(intervalCallback);
    clearInterval(intervalCallback.current);
    setGameState(newGameState);
  }

  function checkWin() {
    for (let i=0; i<board.length; i++) {
      for (let j=0; j<board[i].length; j++) {
        if (board[i][j].content === 'B' && board[i][j].flagged === false)
          return false;
        if (board[i][j].flagged === true && board[i][j].content !== 'B')
          return false;
        if (board[i][j].content !== 'B' && board[i][j].clicked === false)
          return false;
      }
    }
    return true;
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
    if (checkWin()) stopGame(GAME_STATE.WIN);
  }

  function splashBoard(newBoard, x, y) {
    const pos = [[1,0], [0,1], [-1, 0], [0,-1]];
    let queue = [[x,y]];

    while (queue.length > 0) {
      const cx = queue[0][0];
      const cy = queue[0][1];
      newBoard[cx][cy].clicked = true;
      queue.splice(0,1); // pop front.

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

    return newBoard;
  }

  function onBoardClick(x, y) {
    let newBoard = board.slice();

    if (gameState === GAME_STATE.NOT_STARTED) {
      startGame();
    } else if (gameState !== GAME_STATE.ACTIVE) {
      // Nothing should happen when you click a finish game
      return;
    }

    newBoard[x][y].clicked = true;
    if (board[x][y].content === 'B') {
      stopGame(GAME_STATE.LOSE);
    } else if (board[x][y].content === '') {
      newBoard = splashBoard(newBoard, x, y);
    }

    setBoard(newBoard);
    if (checkWin()) stopGame(GAME_STATE.WIN);
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
