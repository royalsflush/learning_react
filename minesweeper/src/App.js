import { useState, useRef, useEffect } from 'react';
import Board from './Board.js';
import { initialiseBoard, countRemainingBombs, checkWin, splashBoard   } from './BoardUtils.js';
import GameState, { GAME_STATE } from './GameState.js';
import ChooseDifficulty from './ChooseDifficulty.js';
import './App.css';

function BombCounter(props) {
  return <div className="tableUtils bombCounter">{props.bombCount}</div> 
}

function Timer(props) {
  return <div className="timer">{props.timer}</div>;
}

function App() {
  const [boardParams, setBoardParams] = useState({
    width: 10,
    height: 10,
    bombCount: 10,
  });
  const [board, setBoard] = useState(initialiseBoard(
    boardParams.width,
    boardParams.height,
    boardParams.bombCount
  ));

  const [gameState, setGameState] = useState(GAME_STATE.NOT_STARTED);
  const [timer, setTimer] = useState(0);

  const gameStartSeconds = useRef(Math.floor(Date.now()/1000));
  const intervalCallback = useRef(null);

  
  useEffect(() => {
    resetGame();
  }, [boardParams]);

  function resetGame() {
    console.log("Game reset");
    
    // Clear the timer interval if it exists
    if (intervalCallback.current) {
      clearInterval(intervalCallback.current);
      intervalCallback.current = null;
    }     

    // Create new board with fresh state
    const newBoard = initialiseBoard(
      boardParams.width,
      boardParams.height,
      boardParams.bombCount
    );
    
    // Update all states at once
    setTimer(0);
    setGameState(GAME_STATE.NOT_STARTED);
    setBoard(newBoard);

    // For debugging
    console.log('New board created:', newBoard);
  }

  function startGame() {
    console.log("Game started");
    gameStartSeconds.current = Math.floor(Date.now()/1000);

    intervalCallback.current = setInterval(() => {
      let timeNow = Math.floor(Date.now()/1000);
      setTimer(Math.floor(timeNow - gameStartSeconds.current));
    }, 1000, [gameStartSeconds]);

    setGameState(GAME_STATE.ACTIVE);
  }

  function stopGame(newGameState) {
    console.log("Game ended");

    clearInterval(intervalCallback.current);
    setGameState(newGameState);
  }

  function onBoardFlag(x, y) {
    if (!board?.[x]?.[y]) return;
    
    let newBoard = board.slice();
    newBoard[x][y].flagged = !board[x][y].flagged;

    if (checkWin(newBoard)) stopGame(GAME_STATE.WIN);
    setBoard(newBoard);
  }

  function onBoardClick(x, y) {
    if (!board?.[x]?.[y]) return;
    
    let newBoard = board.slice();

    if (gameState === GAME_STATE.NOT_STARTED) {
      startGame();
    } else if (gameState !== GAME_STATE.ACTIVE) {
      return;
    }

    newBoard[x][y].clicked = true;
    if (board[x][y].content === 'B') {
      stopGame(GAME_STATE.LOSE);
    } else if (board[x][y].content === '') {
      newBoard = splashBoard(newBoard, x, y);
    }

    if (checkWin(newBoard)) stopGame(GAME_STATE.WIN);
    setBoard(newBoard);
  }

  return (
    <div className="App">
      <Board
          board={board}
          onFlag={onBoardFlag}
          onClick={onBoardClick}
          boardParams={boardParams}
        >
        <BombCounter bombCount={countRemainingBombs(board, boardParams.bombCount)} />
        <GameState gameState={gameState} handleClick={resetGame} />
        <Timer gameState={gameState} timer={timer} setTimer={setTimer} />
      </Board>
      <ChooseDifficulty setBoardParams={setBoardParams} />
    </div>
  );
}

export default App;